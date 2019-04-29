import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./scss/FsLightbox.scss";
import Nav from "./components/nav/Nav.jsx";
import SlideButtonLeft from "./components/slide-buttons/SlideButtonLeft.jsx";
import SlideButtonRight from "./components/slide-buttons/SlideButtonRight.jsx";
import SourcesHoldersWrapper from "./components/sources/SourcesHoldersWrapper.jsx";
import { createRefsArrayForGivenNumber } from "./helpers/arrays/createRefsArrayForGivenNumber";
import { setUpCore } from "./core/setUpCore";
import DownEventDetector from "./components/slide-swiping/DownEventDetector.jsx";
import SwipingInvisibleHover from "./components/slide-swiping/SwipingInvisibleHover.jsx";
import { StageSourceHoldersByValueTransformer } from "./core/transforms/stage-source-holders-transformers/StageSourceHoldersByValueTransformer";
import { SourceHolderTransformer } from "./core/transforms/SourceHolderTransformer";
import { SlideSwipingMoveActions } from "./core/slide-swiping/actions/move/SlideSwipingMoveActions";
import { SlideSwipingUpActions } from "./core/slide-swiping/actions/up/SlideSwipingUpActions";
import { SwipingTransitioner } from "./core/slide-swiping/actions/up/SwipingTransitioner";
import { SwipingSlideChanger } from "./core/slide-swiping/actions/up/SwipingSlideChanger";
import { SourceTypeGetter } from "./core/sources/creating/SourceTypeGetter";
import { SourceSizeAdjusterIterator } from "./core/sizes/SourceSizeAdjusterIterator";
import { LightboxClosingActions } from "./core/main-component/closing/LightboxClosingActions";
import { WindowMoveEventController } from "./core/events-controllers/window/move/WindowMoveEventController";
import { WindowUpEventController } from "./core/events-controllers/window/up/WindowUpEventController";
import { SourceComponentGetter } from "./core/sources/creating/SourceComponentGetter";
import { SourceSizeAdjuster } from "./core/sizes/SourceSizeAdjuster";
import { getScrollbarWidth } from "./core/scrollbar/getScrollbarWidth";
import { runLightboxUnmountActions } from "./core/main-component/runLightboxUnmountActions";
import { DocumentKeyDownEventController } from "./core/events-controllers/document/DocumentKeyDownEventController";
import { WindowResizeEventController } from "./core/events-controllers/window/resize/WindowResizeEventController";
import { SwipingEventsControllersFacade } from "./core/events-controllers/facades/SwipingEventsControllersFacade";
import { FullscreenToggler } from "./core/fullscreen/FullscreenToggler";
import { GlobalResizingController } from "./core/sizes/GlobalResizingController";
import { KeyboardController } from "./core/keyboard/KeyboardController";
import { LightboxCloser } from "./core/main-component/closing/LightboxCloser";
import { LightboxInitializer } from "./core/main-component/LightboxInitializer";
import { LightboxOpener } from "./core/main-component/opening/LightboxOpener";
import { LightboxOpeningActions } from "./core/main-component/opening/LightboxOpeningActions";
import { ScrollbarRecompensor } from "./core/scrollbar/ScrollbarRecompensor";
import { SlideChanger } from "./core/slide/SlideChanger";
import { SlideSwipingDown } from "./core/slide-swiping/events/SlideSwipingDown";
import { SlideSwipingUp } from "./core/slide-swiping/events/SlideSwipingUp";
import { SlideSwipingMove } from "./core/slide-swiping/events/SlideSwipingMove";
import { SourceAnimator } from "./core/animations/SourceAnimator";
import { SourceController } from "./core/sources/SourceController";
import { SourcesFactory } from "./core/sources/creating/SourcesFactory";
import { Stage } from "./core/stage/Stage";
import { SourceHoldersTransformer } from "./core/transforms/SourceHoldersTransformer";

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
        this.data = {
            urls: this.props.urls,
            totalSlides: this.props.urls.length,
            isInitialized: false,
            scrollbarWidth: getScrollbarWidth(),
            isSwipingSlides: false,
        };
    }

    setUpSourcesData() {
        this.sourcesData = {
            isSourceAlreadyInitializedArray: [],
            videosPosters: (this.props.videosPosters) ? this.props.videosPosters : [],
            maxSourceWidth: 0,
            maxSourceHeight: 0,
            slideDistance: (this.props.slideDistance) ? this.props.slideDistance : 1.3,
        };
    }

    setUpStates() {
        this.state = {
            isOpen: this.props.isOpen,
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
        this.getters = {
            getIsOpen: () => this.state.isOpen,
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
            sourcesComponents: [],
        };
    }

    setUpCollections() {
        this.collections = {
            // after source load its size adjuster will be stored in this array so SourceSizeAdjusterIterator may use it
            sourceSizeAdjusters: [],
            // if lightbox is unmounted pending xhrs need to be aborted
            xhrs: []
        }
    }

    setUpInjector() {
        this.injector = {
            core: {
                eventsControllers: {
                    document: {
                        getKeyDown: () => new DocumentKeyDownEventController(this),
                    },
                    window: {
                        getResize: () => new WindowResizeEventController(this),
                        getSwiping: () => new SwipingEventsControllersFacade(this),
                    }
                },
                getFullscreenToggler: () => new FullscreenToggler(this),
                getGlobalResizingController: () => new GlobalResizingController(this),
                getKeyboardController: () => new KeyboardController(this),
                getLightboxCloser: () => new LightboxCloser(this),
                getLightboxInitializer: () => new LightboxInitializer(this),
                getLightboxOpener: () => new LightboxOpener(this),
                getLightboxOpeningActions: () => new LightboxOpeningActions(this),
                getScrollbarRecompensor: () => new ScrollbarRecompensor(this),
                getSlideChanger: () => new SlideChanger(this),
                slideSwiping: {
                    getDownForSwipingProps: (swipingProps) => new SlideSwipingDown(this, swipingProps),
                    getMoveForSwipingProps: (swipingProps) => new SlideSwipingMove(this, swipingProps),
                    getUpForSwipingProps: (swipingProps) => new SlideSwipingUp(this, swipingProps)
                },
                getSourceAnimator: () => new SourceAnimator(this),
                getSourceController: () => new SourceController(this),
                getSourceHoldersTransformer: () => new SourceHoldersTransformer(this),
                getSourcesFactory: () => new SourcesFactory(this),
                getStage: () => new Stage(this)
            },
            dom: {
                getXMLHttpRequest: () => new XMLHttpRequest()
            },
            eventsControllers: {
                getWindowMoveEventController: () => new WindowMoveEventController(this),
                getWindowUpEventController: () => new WindowUpEventController(this)
            },
            mainComponent: {
                getClosingActions: () => new LightboxClosingActions(this),
            },
            sizes: {
                getSourceSizeAdjusterIterator: () => new SourceSizeAdjusterIterator(this)
            },
            slideSwiping: {
                getMoveActionsForSwipingProps: (swipingProps) => new SlideSwipingMoveActions(this, swipingProps),
                getUpActionsForSwipingProps: (swipingProps) => new SlideSwipingUpActions(this, swipingProps),
                getSwipingTransitioner: () => new SwipingTransitioner(this),
                getSwipingSlideChangerForSwipingTransitioner: (swipingTransitioner) =>
                    new SwipingSlideChanger(this, swipingTransitioner),
            },
            source: {
                getSourceComponentGetter: () => new SourceComponentGetter(this),
                getSourceTypeGetter: () => new SourceTypeGetter(this),
                getSourceSizeAdjuster: () => new SourceSizeAdjuster(this),
            },
            transforms: {
                getSourceHolderTransformer: () => new SourceHolderTransformer(this),
                getStageSourceHoldersByValueTransformer: () => new StageSourceHoldersByValueTransformer(this),
                getInitialStageSourceHoldersByValueTransformer: () => ({ stageSourcesIndexes: {} })
            }
        };
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
            lightboxInitializer: {},
            lightboxOpener: {},
            lightboxOpeningActions: {},
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
            sourcesFactory: {},
            stage: {}
        };
        setUpCore(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isOpen !== this.props.isOpen) {
            (this.state.isOpen) ?
                this.core.lightboxCloser.closeLightbox() :
                this.core.lightboxOpener.openLightbox();
        }
        if (prevProps.slide !== this.props.slide && this.props.slide !== this.componentsStates.slide.get()) {
            this.core.slideChanger.changeSlideTo(this.props.slide);
        }
    }

    componentDidMount() {
        if (this.state.isOpen) {
            this.core.lightboxOpeningActions.runActions(this);
        }
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
                <SourcesHoldersWrapper fsLightbox={ this }/>
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