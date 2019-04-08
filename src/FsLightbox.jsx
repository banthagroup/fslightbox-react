import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./scss/FsLightbox.scss";
import Nav from "./components/Nav/Nav.jsx";
import SlideButtonLeft from "./components/SlideButtons/SlideButtonLeft.jsx";
import SlideButtonRight from "./components/SlideButtons/SlideButtonRight.jsx";
import MediaHolder from "./components/Holders/MediaHolder.jsx";
import { createRefsArrayForNumberOfSlides } from "./utils/Arrays/createRefsArrayForNumberOfSlides";
import { createNullArrayForNumberOfSlides } from "./utils/Arrays/createNullArrayForNumberOfSlides";
import { getDeviceType } from "./utils/getDeviceType";
import { Core } from "./core/Core";
import DownEventDetector from "./components/SlideSwiping/DownEventDetector.jsx";
import SwipingInvisibleHover from "./components/SlideSwiping/SwipingInvisibleHover.jsx";
import { StageSourceHoldersByValueTransformer } from "./core/Transforms/StageSourceHoldersTransformers/StageSourceHoldersByValueTransformer";
import { SourceHolderTransformer } from "./core/Transforms/SourceHolderTransformer";
import { SlideSwipingMoveActions } from "./core/SlideSwiping/Actions/Move/SlideSwipingMoveActions";
import { SlideSwipingUpActions } from "./core/SlideSwiping/Actions/Up/SlideSwipingUpActions";
import { SwipingTransitioner } from "./core/SlideSwiping/Actions/Up/SwipingTransitioner";
import { SwipingSlideChanger } from "./core/SlideSwiping/Actions/Up/SwipingSlideChanger";

class FsLightbox extends Component {
    constructor(props) {
        super(props);
        this.setUpData();
        this.setUpSourcesData();
        this.setUpStates();
        this.setUpGetters();
        this.setUpSetters();
        this.setUpElements();
        this.setUpCollections();
        this.setUpInjector();
        this.setUpCore();
    }

    setUpData() {
        /**
         * @type {{deviceType: number, urls: Array, totalSlides: number, isInitialized: boolean, isSwipingSlides: boolean, isFullscreenOpen: boolean}}
         */
        this.data = {
            urls: this.props.urls,
            totalSlides: this.props.urls.length,
            isFullscreenOpen: false,
            isInitialized: false,
            isSwipingSlides: false,
            deviceType: getDeviceType()
        }
    }

    setUpSourcesData() {
        /**
         * @type {{slideDistance: *, sourcesTypes: Array, maxSourceHeight: number, videosPosters: Array, maxSourceWidth: number, sourcesToCreateOnConstruct: Array, isSourceAlreadyLoadedArray: Array, sourcesDimensions: Array}}
         */
        this.sourcesData = {
            sourcesTypes: [],
            isSourceAlreadyLoadedArray: [],
            // if lightbox will be closed during source type check we need call create source after next open
            sourcesToCreateOnConstruct: [],
            videosPosters: (this.props.videosPosters) ? this.props.videosPosters : [],
            maxSourceWidth: 0,
            maxSourceHeight: 0,
            slideDistance: (this.props.slideDistance) ? this.props.slideDistance : 1.3,
            sourcesDimensions: [],
        };
    }

    setUpStates() {
        /**
         * @type {{isOpen: Boolean, slide: *, isSwipingSlides: boolean}}
         */
        this.state = {
            isOpen: this.props.isOpen,
            isSwipingSlides: false,
            slide: (this.props.slide) ? this.props.slide : 1,
        };
    }

    setUpGetters() {
        this.getters = {
            initialize: () => this.initialize(),
            getSlide: () => this.state.slide,
            getIsSwipingSlides: () => this.state.isSwipingSlides,
            // TODO: ? - CHECK IF IT IS USED
            getIsFullscreenOpen: () => {
            }
        };
    }

    setUpSetters() {
        this.setters = {
            setState: (value, callback) => this.setState(value, callback)
        }
    }

    setUpElements() {
        /**
         * @type {{container: React.RefObject<any>, sourcesJSXComponents: Array, sources: Array, mediaHolder: React.RefObject<any>, sourceHolders: Array}}
         */
        this.elements = {
            container: React.createRef(),
            mediaHolder: React.createRef(),
            sources: createRefsArrayForNumberOfSlides(this.data.totalSlides),
            sourceHolders: createRefsArrayForNumberOfSlides(this.data.totalSlides),
            sourcesJSXComponents: createNullArrayForNumberOfSlides(this.data.totalSlides),
        };
    }

    setUpInjector() {
        this.injector = {
            transforms: {
                getSourceHolderTransformer: () => new SourceHolderTransformer(this),
                getStageSourceHoldersByValueTransformer: () => new StageSourceHoldersByValueTransformer(this),
                getInitialStageSourceHoldersByValueTransformer: () => ({ stageSourcesIndexes: {} })
            },
            slideSwiping: {
                getMoveActionsForSwipingProps: (swipingProps) => new SlideSwipingMoveActions(this, swipingProps),
                getUpActionsForSwipingProps: (swipingProps) => new SlideSwipingUpActions(this, swipingProps),
                getSwipingTransitioner: () => new SwipingTransitioner(this),
                getSwipingSlideChangerForSwipingTransitioner: (swipingTransitioner) => new SwipingSlideChanger(this, swipingTransitioner),
            }
        };
    }

    setUpCore() {
        this.core = new Core(this);
    }

    setUpCollections() {
        /**
         * @type {{sourceSizeAdjusters: Array}}
         */
        this.collections = {
            // after source load its size adjuster will be stored in this array so SourceSizeAdjusterIterator may use it
            sourceSizeAdjusters: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isOpen !== this.props.isOpen) {
            (this.state.isOpen) ?
                this.core.closeOpenLightbox.closeLightbox() :
                this.core.closeOpenLightbox.openLightbox();
        }
        if (prevProps.slide !== this.props.slide) {
            this.core.slideChanger.changeSlideTo(this.props.slide);
        }
    }

    initialize() {
        this.data.isInitialized = true;
        this.core.sizeController.controlAllSizes();
        this.core.eventsControllers.window.resize.attachListener();
        this.core.eventsControllers.window.swiping.attachListeners();
        this.core.sourceHoldersTransformer.transformStageSourceHolders().withoutTimeout();
    }

    componentDidMount() {
        if (this.props.isOpen) {
            this.initialize();
            this.core.closeOpenLightbox.addOpeningClassToDocument();
        }
    }

    render() {
        if (!this.state.isOpen) return null;

        return (
            <div ref={ this.elements.container } className="fslightbox-container fslightbox-full-dimension">
                <DownEventDetector isSwipingSlides={ this.state.isSwipingSlides } core={ this.core }/>
                <SwipingInvisibleHover isSwipingSlides={ this.state.isSwipingSlides } core={ this.core }/>
                <Nav
                    core={ this.core }
                    data={ this.data }
                    slide={ this.state.slide }
                />
                { (this.data.totalSlides > 1) ?
                    <>
                        <SlideButtonLeft core={ this.core }/>
                        <SlideButtonRight core={ this.core }/>
                    </> : null
                }
                <MediaHolder
                    fsLightbox={ this }
                />
            </div>
        );
    }
}

FsLightbox.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    urls: PropTypes.array.isRequired,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onInit: PropTypes.func,
    onShow: PropTypes.func,
    videosPosters: PropTypes.array,
    slide: PropTypes.number,
    slideDistance: PropTypes.number,
};

export default FsLightbox;