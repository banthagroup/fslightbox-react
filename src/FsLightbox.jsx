import PropTypes from "prop-types";
import React, { Component } from "react";
import Nav from "./components/nav/Nav.jsx";
import SwipingInvisibleHover from "./components/slide-swiping/SlideSwipingHoverer.jsx";
import SlideButton from "./components/SlideButton.jsx";
import SourceWrappersContainer from "./components/sources/SourceWrappersContainer.jsx";
import {
  FADE_IN_STRONG_CLASS_NAME,
  FULL_DIMENSION_CLASS_NAME,
  PREFIX,
} from "./constants/classes-names";
import { runLightboxMountedActions } from "./core/main-component/mounting/runLightboxMountedActions";
import { setUpLightboxOpener } from "./core/main-component/opening/setUpLightboxOpener";
import { runLightboxUnmountActions } from "./core/main-component/unmounting/runLightboxUnmountActions";
import { setUpLightboxUpdater } from "./core/main-component/updating/setUpLightboxUpdater";
import "./core/styles/styles-injection/styles-injection";

class FsLightbox extends Component {
  constructor(props) {
    super(props);

    this.data = {
      isInitialized: false,
      maxSourceWidth: 0,
      maxSourceHeight: 0,
      scrollbarWidth: 0,
    };

    this.slideSwipingProps = {
      isSwiping: false,
      downScreenX: null,
      isSourceDownEventTarget: false,
      swipedX: 0,
    };

    /**
     * @property {Number} previous
     * @property {Number} current
     * @property {Number} next
     */
    this.stageIndexes = {
      current: 0,
    };

    this.state = {
      isOpen: false,
    };
    /**
     * To objects are assigned in correct components two methods:
     * - get()
     * - set(value)
     * And (only if it is used, by default not) property:
     * - onUpdate - after setting it to method it will be called once component updates
     * (its called only one time - after first call its deleted)
     */
    this.componentsServices = {
      showSlideSwipingHovererIfNotYet: null,
      hideSlideSwipingHovererIfShown: null,
      setSlideNumber: null,
      isSlideSwipingHovererShown: {},
      isFullscreenOpen: {},
      hideSourceLoaderCollection: [],
      updateSourceDirectWrapperCollection: [],
      toolbarButtons: {
        fullscreen: {},
      },
      isLightboxOpenManager: {
        get: () => this.state.isOpen,
        set: (value, callback) => {
          this.setState({ isOpen: value }, callback);
        },
      },
    };

    /**
     * Arrays of refs like sources are set during lightbox initialize because they require sources count
     */
    this.elements = {
      container: React.createRef(),
      sourceMainWrappersWrapper: React.createRef(),
      sources: null,
      sourceMainWrappers: null,
      sourceAnimationWrappers: null,
      sourcesComponents: [],
    };

    this.collections = {
      sourceMainWrapperTransformers: [],
      sourceLoadHandlers: [],
      // after source load its size adjuster will be stored in this array so it may be later resized
      sourceSizers: [],
      // if lightbox is unmounted pending xhrs need to be aborted
      xhrs: [],
    };

    this.core = {
      classFacade: {},
      eventsDispatcher: {},
      fullscreenToggler: {},
      globalEventsController: {},
      lightboxCloser: {},
      lightboxCloseActioner: {},
      lightboxOpener: {},
      lightboxOpenActioner: {},
      lightboxUpdater: {},
      scrollbarRecompensor: {},
      slideChangeFacade: {},
      slideIndexChanger: {}, // here
      slideSwipingDown: {},
      sourceDisplayFacade: {},
      stageManager: {},
      windowResizeActioner: {},
    };

    this.getQueuedAction = this.getQueuedAction.bind(this);
    this.resolve = this.resolve.bind(this);
    this.timeout = this.timeout.bind(this);

    // setting up dependencies required to initialize lightbox
    // rest of the core is set up at initialize, because lightbox gets props on first open not at mount
    setUpLightboxUpdater(this);
    setUpLightboxOpener(this);
  }

  getQueuedAction(action, time) {
    const queue = [];

    return () => {
      queue.push(true);

      this.timeout(() => {
        queue.pop();

        if (!queue.length) {
          action();
        }
      }, time);
    };
  }

  resolve(dependency, params = []) {
    params.unshift(this);
    return new dependency(...params);
  }

  /**
   * Prevents calling timeouted function on closed or unmounted lightbox.
   */
  timeout(handler, timeout) {
    setTimeout(() => {
      if (this.elements.container.current) {
        handler();
      }
    }, timeout);
  }

  componentDidUpdate(prevProps, second, third) {
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
      <div
        data-test-id="container"
        ref={this.elements.container}
        className={`${PREFIX}container ${FULL_DIMENSION_CLASS_NAME} ${FADE_IN_STRONG_CLASS_NAME}`}
      >
        <SwipingInvisibleHover fsLightbox={this} />
        <Nav fsLightbox={this} />
        {this.props.sources.length > 1 ? (
          <>
            <SlideButton
              onClick={this.core.slideChangeFacade.changeToPrevious}
              name="previous"
              d="M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788S18.707,9.212,18.271,9.212z"
            />
            <SlideButton
              onClick={this.core.slideChangeFacade.changeToNext}
              name="next"
              d="M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788S1.293,9.212,1.729,9.212z"
            />
          </>
        ) : null}
        <SourceWrappersContainer fsLightbox={this} />
      </div>
    );
  }
}

FsLightbox.propTypes = {
  toggler: PropTypes.bool,
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
  type: PropTypes.string,

  // sources
  customAttributes: PropTypes.array,
  maxYoutubeVideoDimensions: PropTypes.object,

  // preferences
  exitFullscreenOnClose: PropTypes.bool,
  loadOnlyCurrentSource: PropTypes.bool,
  openOnMount: PropTypes.bool,
  slideDistance: PropTypes.number,
};

FsLightbox.defaultProps = {
  slideDistance: 0.3,
};

export default FsLightbox;
