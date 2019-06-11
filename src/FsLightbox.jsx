import "./core/styles/styles-injection";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nav from "./components/nav/Nav.jsx";
import SlideButtonLeft from "./components/slide-buttons/SlideButtonLeft.jsx";
import SlideButtonRight from "./components/slide-buttons/SlideButtonRight.jsx";
import SourceHoldersWrapper from "./components/sources/SourceHoldersWrapper.jsx";
import { createRefsArrayForGivenNumber } from "./helpers/arrays/createRefsArrayForGivenNumber";
import { setUpCore } from "./core/setUpCore";
import DownEventDetector from "./components/slide-swiping/DownEventDetector.jsx";
import SwipingInvisibleHover from "./components/slide-swiping/SwipingInvisibleHover.jsx";
import { runLightboxUnmountActions } from "./core/main-component/unmounting/runLightboxUnmountActions";
import { Injector } from "./injection/Injector";
import { EventsDispatcher } from "./core/main-component/EventsDispatcher";
import { runLightboxMountedActions } from "./core/main-component/mounting/runLightboxMountedActions";

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
        this.setUpEventsDispatcher();
        this.setUpCore();
    }

    setUpData() {
        this.data = {
            urls: this.props.urls,
            totalSlides: this.props.urls.length,
            slideOnLightboxOpen: (this.props.slide) ? this.props.slide : 1,
            isInitialized: false,
            scrollbarWidth: 0,
            isSwipingSlides: false,
        };
    }

    setUpSourcesData() {
        this.sourcesData = {
            isSourceAlreadyInitializedArray: [],
            videosPosters: (this.props.videosPosters) ? this.props.videosPosters : [],
            maxSourceWidth: 0,
            maxSourceHeight: 0,
            slideDistance: (this.props.slideDistance) ? this.props.slideDistance : 0.3,
        };
    }

    setUpStates() {
        this.state = {
            isOpen: this.props.toggler,
        };

        // to objects are assigned in correct components two methods:
        // - get()
        // - set(value)
        // And (only if it is used, by default not) property:
        // - onUpdate - after setting it to method it will be called once component updates
        // (its called only one time - after first call its deleted)
        this.componentsStates = {
            slide: {},
            hasMovedWhileSwiping: {},
            isFullscreenOpen: {},
            shouldSourceHolderBeUpdatedCollection: [],
        };
    }

    setUpGetters() {
        this.getProps = () => this.props;
        this.getState = () => this.state;
        this.getters = {
            getIsOpen: () => this.state.isOpen,
            props: {
                getSlide: () => this.props.slide
            },
        };
    }

    setUpSetters() {
        this.setters = {
            setState: (value, callback) => this.setState(value, callback),
        }
    }

    setUpElements() {
        this.elements = {
            container: React.createRef(),
            sourcesHoldersWrapper: React.createRef(),
            sources: createRefsArrayForGivenNumber(this.data.totalSlides),
            sourceHolders: createRefsArrayForGivenNumber(this.data.totalSlides),
            sourcesComponents: {},
        };
    }

    setUpCollections() {
        this.collections = {
            sourcesLoadHandlers: [],
            // after source load its size adjuster will be stored in this array so SourceSizeAdjusterIterator may use it
            sourceSizeAdjusters: [],
            // if lightbox is unmounted pending xhrs need to be aborted
            xhrs: []
        }
    }

    setUpInjector() {
        this.injector = new Injector(this);
    }

    setUpEventsDispatcher() {
        this.eventsDispatcher = this.injector.injectDependency(EventsDispatcher);
    }

    setUpCore() {
        this.core = {
            eventsControllers: {
                document: {
                    keyDown: {},
                },
                window: {
                    resize: {},
                    swiping: {},
                }
            },
            fullscreenToggler: {},
            globalResizingController: {},
            keyboardController: {},
            lightboxCloser: {},
            lightboxOpener: {},
            lightboxOpeningActions: {},
            lightboxUpdater: {},
            scrollbarRecompensor: {},
            slideChanger: {},
            slideSwiping: {
                down: {},
                move: {},
                up: {}
            },
            sourceAnimator: {},
            sourceController: {},
            sourceHoldersTransformer: {},
            stage: {}
        };
        setUpCore(this);
    }

    componentDidUpdate(prevProps) {
        this.core.lightboxUpdater.handleUpdate(prevProps);
    }

    componentDidMount() {
        runLightboxMountedActions(this);
    }

    componentWillUnmount() {
        runLightboxUnmountActions(this);
    }

    render() {
        if (!this.state.isOpen) return null;

        return (
            <div ref={ this.elements.container }
                 className="fslightbox-container fslightbox-full-dimension fslightbox-fade-in-long">
                <DownEventDetector fsLightbox={ this }/>
                <SwipingInvisibleHover fsLightbox={ this }/>
                <Nav fsLightbox={ this }/>
                { (this.data.totalSlides > 1) ?
                    <>
                        <SlideButtonLeft fsLightbox={ this }/>
                        <SlideButtonRight fsLightbox={ this }/>
                    </> : null
                }
                <SourceHoldersWrapper fsLightbox={ this }/>
            </div>
        );
    }
}

FsLightbox.propTypes = {
    toggler: PropTypes.bool.isRequired,
    urls: PropTypes.array.isRequired,
    types: PropTypes.array,
    disableLocalStorage: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onInit: PropTypes.func,
    onShow: PropTypes.func,
    slide: PropTypes.number,
    slideDistance: PropTypes.number,
    videosPosters: PropTypes.array
};

export default FsLightbox;
