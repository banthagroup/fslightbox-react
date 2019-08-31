import './core/styles/styles-injection/styles-injection';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nav from "./components/nav/Nav.jsx";
import SourcesHoldersWrapper from "./components/sources/SourcesOutersWrapper.jsx";
import { createRefsArrayWithLength } from "./helpers/arrays/createRefsArrayWithLength";
import { setUpCore } from "./core/setUpCore";
import SwipingInvisibleHover from "./components/slide-swiping/SlideSwipingHoverer.jsx";
import { runLightboxUnmountActions } from "./core/main-component/unmounting/runLightboxUnmountActions";
import { Injector } from "./injection/Injector";
import { runLightboxMountedActions } from "./core/main-component/mounting/runLightboxMountedActions";
import { getInitialCurrentIndex } from "./core/stage/getInitialCurrentIndex";
import { getSourcesHoldersTransformersCollection } from "./core/collections/getSourcesHoldersTransformersCollection";
import {
    FADE_IN_STRONG_CLASS_NAME,
    FULL_DIMENSION_CLASS_NAME,
    PREFIX
} from "./constants/classes-names";
import SlideButton from "./components/SlideButton.jsx";

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
        this.setUpCore();
    }

    setUpData() {
        this.data = {
            sources: (this.props.sources) ? this.props.sources : this.props.urls,
            sourcesCount: null,
            isInitialized: false,
            maxSourceWidth: 0,
            maxSourceHeight: 0,
            scrollbarWidth: 0,
            slideDistance: (this.props.slideDistance) ? this.props.slideDistance : 0.3
        };

        this.data.sourcesCount = this.data.sources.length;

        this.slideSwipingProps = {
            isSwiping: false,
            downClientX: null,
            isSourceDownEventTarget: false,
            swipedX: 0
        };
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
            isOpen: this.props.openOnMount,
        };

        // to objects are assigned in correct components two methods:
        // - get()
        // - set(value)
        // And (only if it is used, by default not) property:
        // - onUpdate - after setting it to method it will be called once component updates
        // (its called only one time - after first call its deleted)
        this.componentsStates = {
            slideNumberUpdater: {},
            isSlideSwipingHovererShown: {},
            isFullscreenOpen: {},
            isSourceLoadedCollection: [],
            sourcesInnersUpdatersCollection: [],
            toolbarButtons: {
                fullscreen: {}
            }
        };
    }

    setUpGetters() {
        this.getProps = () => this.props;
        this.getState = () => this.state;
    }

    setUpSetters() {
        this.setMainComponentState = (value, callback) => this.setState(value, callback);
    }

    setUpElements() {
        this.elements = {
            container: React.createRef(),
            sourcesHoldersWrapper: React.createRef(),
            sources: createRefsArrayWithLength(this.data.sourcesCount),
            sourcesOuters: createRefsArrayWithLength(this.data.sourcesCount),
            sourcesInners: createRefsArrayWithLength(this.data.sourcesCount),
            sourcesComponents: [],
        };
    }

    setUpInjector() {
        this.injector = new Injector(this);
    }

    setUpCollections() {
        this.collections = {
            sourcesOutersTransformers: getSourcesHoldersTransformersCollection(this),
            sourcesLoadsHandlers: [],
            // after source load its size adjuster will be stored in this array so it may be later resized
            sourcesStylers: [],
            // if lightbox is unmounted pending xhrs need to be aborted
            xhrs: []
        }
    }

    setUpCore() {
        this.core = {
            classFacade: {},
            eventsControllers: {
                document: {
                    keyDown: {},
                },
                window: {
                    resize: {},
                    swiping: {},
                }
            },
            eventsDispatcher: {},
            fullscreenToggler: {},
            keyboardController: {},
            lightboxCloser: {},
            lightboxOpener: {},
            lightboxOpenActioner: {},
            lightboxUpdater: {},
            scrollbarRecompensor: {},
            slideChangeFacade: {},
            slideIndexChanger: {},
            slideSwiping: {
                down: {},
                move: {},
                up: {}
            },
            sourceLoadActioner: {},
            stageManager: {},
            windowResizeActioner: {}
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
                 className={ `${ PREFIX }container ${ FULL_DIMENSION_CLASS_NAME } ${ FADE_IN_STRONG_CLASS_NAME }` }>
                <SwipingInvisibleHover fsLightbox={ this } />
                <Nav fsLightbox={ this } />
                { (this.data.sourcesCount > 1) ?
                    <>
                        <SlideButton
                            onClick={ this.core.slideChangeFacade.changeToPrevious }
                            name='previous'
                            d='M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788S18.707,9.212,18.271,9.212z'
                        />
                        <SlideButton
                            onClick={ this.core.slideChangeFacade.changeToNext }
                            name='next'
                            d='M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788S1.293,9.212,1.729,9.212z'
                        />
                    </> : null
                }
                <SourcesHoldersWrapper fsLightbox={ this } />
            </div>
        );
    }
}

FsLightbox.propTypes = {
    toggler: PropTypes.bool.isRequired,
    urls: PropTypes.array, // deprecated: 1.3.0
    sources: PropTypes.array,

    customSources: PropTypes.array,
    customSourcesDimensions: PropTypes.array,
    customSourcesGlobalDimensions: PropTypes.object,

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
    type: PropTypes.string,

    // sources
    videosPosters: PropTypes.array,
    maxYoutubeVideoDimensions: PropTypes.object,

    // preferences
    slideDistance: PropTypes.number,
    openOnMount: PropTypes.bool
};

export default FsLightbox;
