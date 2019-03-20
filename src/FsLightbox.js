import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nav from "./components/nav/Nav.jsx";
import "./css/fslightboxBasic.css";
import SlideButtonLeft from "./components/slideButtons/SlideButtonLeft.jsx";
import SlideButtonRight from "./components/slideButtons/SlideButtonRight.jsx";
import MediaHolder from "./components/holders/MediaHolder.jsx";
import { OnResize } from "./core/OnResize";
import { createRefsArrayForNumberOfSlides } from "./utils/Arrays/createRefsArrayForNumberOfSlides";
import { createNullArrayForNumberOfSlides } from "./utils/Arrays/createNullArrayForNumberOfSlides";
import { StageSources } from "./core/Stage/StageSources";
import { SourceHoldersTransformer } from "./core/Transforms/SourceHoldersTransformer";
import { SlideChanger } from "./core/Slide/SlideChanger";
import { SourceAnimator } from "./core/Animations/SourceAnimator";
import { FullscreenToggler } from "./core/Fullscreen/FullscreenToggler";
import { CloseOpenLightbox } from "./core/CloseOpenLightbox";
import { checkIfUserIsOnMobileDevice } from "./utils/checkIfUserIsOnMobileDevice";
import { SourceSizeAdjusterIterator } from "./core/Source/SourceSizeAdjusterIterator";
import { Core } from "./core/Core";

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
        this.setUpCore();
    }

    setUpData() {
        /**
         * @type {{urls: Array, totalSlides: number, isInitialized: boolean, isFullscreenOpen: boolean, isMobile: *}}
         */
        this.data = {
            urls: this.props.urls,
            totalSlides: this.props.urls.length,
            isFullscreenOpen: false,
            isInitialized: false,
            isMobile: checkIfUserIsOnMobileDevice()
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
        this.state = {
            isOpen: this.props.isOpen,
            slide: (this.props.slide) ? this.props.slide : 1,
        };
    }

    setUpGetters() {
        this.getters = {
            initialize: () => this.initialize(),
            getSlide: () =>  this.state.slide,
        };
    }

    setUpSetters() {
        this.setters = {
            setState: (value, callback) => this.setState(value, callback),
            sourcesData: {
                setMaxSourceWidth: (maxSourceWidth) => this.sourcesData.maxSourceWidth = maxSourceWidth,
                setMaxSourceHeight: (maxSourceHeight) => this.sourcesData.maxSourceHeight = maxSourceHeight
            }
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

    setUpCore() {
        /**
         * @type {Core}
         */
        this.core = new Core(this);
    }

    setUpCollections() {
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
        this.core.onResize.init();
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
            <div ref={ this.elements.container } className="fslightbox-container">
                <Nav fsLightbox={ this }/>
                <SlideButtonLeft _={ this }/>
                <SlideButtonRight _={ this }/>
                <MediaHolder _={ this }/>
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

    // developer can add video poster if he wants to
    videosPosters: PropTypes.array,

    slide: PropTypes.number,

    slideDistance: PropTypes.number,
};

export default FsLightbox;