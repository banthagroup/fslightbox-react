import "./core/styles/styles-injection";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nav from "./components/nav/Nav.jsx";
import SlideButtonPrevious from "./components/slide-buttons/SlideButtonPrevious.jsx";
import SlideButtonNext from "./components/slide-buttons/SlideButtonNext.jsx";
import SourceHoldersWrapper from "./components/sources/SourceHoldersWrapper.jsx";
import { createRefsArrayForGivenNumber } from "./helpers/arrays/createRefsArrayForGivenNumber";
import { setUpCore } from "./core/setUpCore";
import DownEventDetector from "./components/slide-swiping/DownEventDetector.jsx";
import SwipingInvisibleHover from "./components/slide-swiping/SwipingInvisibleHover.jsx";
import { runLightboxUnmountActions } from "./core/main-component/unmounting/runLightboxUnmountActions";
import { Injector } from "./injection/Injector";
import { EventsDispatcher } from "./core/main-component/EventsDispatcher";
import { runLightboxMountedActions } from "./core/main-component/mounting/runLightboxMountedActions";
import { getInitialCurrentIndex } from "./core/stage/getInitialCurrentIndex";
import { getSourcesHoldersTransformersCollection } from "./core/collections/getSourcesHoldersTransformersCollection";
import { FULL_DIMENSION_CLASS_NAME, LONG_FADE_IN_CLASS_NAME, PREFIX } from "./constants/classes-names";

class FsLightbox extends Component {
    constructor(props) {
        super(props);
        this.setUpData();
        this.setUpStageIndexes();
        this.setUpStates();
        this.setUpGetters();
        this.setUpSetters();
        this.setUpElements();
        this.setUpInjector();
        this.setUpCollections();
        this.setUpEventsDispatcher();
        this.setUpCore();
    }

    setUpData() {
        this.data = {
            sources: (this.props.sources) ? this.props.sources : this.props.urls,
            sourcesCount: null,
            lastSourceIndex: null,
            isInitialized: false,
            isSwipingSlides: false,
            maxSourceWidth: 0,
            maxSourceHeight: 0,
            scrollbarWidth: 0,
            slideDistance: (this.props.slideDistance) ? this.props.slideDistance : 0.3
        };
        this.data.sourcesCount = this.data.sources.length;
        this.data.lastSourceIndex = this.data.sourcesCount - 1;
    }


    setUpStageIndexes() {
        this.stageIndexes = {
            previous: undefined,
            current: getInitialCurrentIndex(this),
            next: undefined
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
            slideNumberUpdater: {},
            hasMovedWhileSwiping: {},
            isFullscreenOpen: {},
            shouldSourceHolderBeUpdatedCollection: []
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
            sources: createRefsArrayForGivenNumber(this.data.sourcesCount),
            sourcesHolders: createRefsArrayForGivenNumber(this.data.sourcesCount),
            sourcesComponents: {},
        };
    }

    setUpInjector() {
        this.injector = new Injector(this);
    }

    setUpCollections() {
        this.collections = {
            sourcesHoldersTransformers: getSourcesHoldersTransformersCollection(this),
            sourcesLoadHandlers: [],
            // after source load its size adjuster will be stored in this array so SourceSizeAdjusterIterator may use it
            sourceSizeAdjusters: [],
            // if lightbox is unmounted pending xhrs need to be aborted
            xhrs: []
        }
    }

    setUpEventsDispatcher() {
        this.eventsDispatcher = this.injector.injectDependency(EventsDispatcher);
    }

    setUpCore() {
        this.core = {
            classListManager: {},
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
            slideIndexChanger: {},
            slideNumberUpdater: {},
            slideSwiping: {
                down: {},
                move: {},
                up: {}
            },
            sourceAnimator: {},
            sourceController: {},
            sourcesHoldersTransformingFacade: {},
            stageManager: {},
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
                 className={ `${ PREFIX }container ${ FULL_DIMENSION_CLASS_NAME } ${ LONG_FADE_IN_CLASS_NAME }` }>
                <DownEventDetector fsLightbox={ this }/>
                <SwipingInvisibleHover fsLightbox={ this }/>
                <Nav fsLightbox={ this }/>
                { (this.data.sourcesCount > 1) ?
                    <>
                        <SlideButtonPrevious fsLightbox={ this }/>
                        <SlideButtonNext fsLightbox={ this }/>
                    </> : null
                }
                <SourceHoldersWrapper fsLightbox={ this }/>
            </div>
        );
    }
}

FsLightbox.propTypes = {
    toggler: PropTypes.bool.isRequired,
    urls: PropTypes.array, // deprecated: 1.2.1
    sources: PropTypes.array,

    // slide number controlling
    slide: PropTypes.number,
    source: PropTypes.string,
    sourceIndex: PropTypes.number,

    // events
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onInit: PropTypes.func,
    onShow: PropTypes.func,

    // types
    disableLocalStorage: PropTypes.bool,
    types: PropTypes.array,

    // sources
    videosPosters: PropTypes.array,

    // preferences
    slideDistance: PropTypes.number
};

export default FsLightbox;
