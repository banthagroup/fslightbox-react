import { CONTAINER_FADE_OUT_TIME } from "../constants/CoreConstants";
import { LONG_FADE_OUT_CLASS_NAME, FSLIGHTBOX_OPEN_CLASS_NAME } from "../constants/CssConstants";

/**
 * @class CloseOpenLightbox
 * @param { { current } } container
 * @param { FsLightbox.data } data
 * @param { FsLightbox.componentsStates.isFullscreenOpen | { get: function(): boolean, set: function(boolean)} } isFullscreenOpenState
 * @param { FsLightbox.setters.setState | Function } setState
 * @param { FsLightbox.initialize | Function } initialize
 * @param { FsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders | function(): StageSourceHoldersTransformer } transformStageSourceHolders
 * @param { FsLightbox.core.fullscreenToggler.turnOffFullscreen | Function  } turnOffFullscreen
 * @param { FsLightbox.core.globalResizingController.controlAllSizes | Function  } controlAllSizes
 * @param { FsLightbox.core.eventsControllers.window.resize.removeListener | Function  } removeResizeListener
 * @param { FsLightbox.core.eventsControllers.window.resize.attachListener | Function  } attachResizeListener
 * @param { FsLightbox.core.eventsControllers.window.swiping.removeListeners | Function  } removeSwipingListeners
 * @param { FsLightbox.core.eventsControllers.window.resize.attachListeners | Function  } attachSwipingListeners
 */
export function CloseOpenLightbox(
    {
        data,
        setters: { setState },
        getters: { initialize },
        componentsStates: {
            isFullscreenOpen: isFullscreenOpenState
        },
        elements: { container },
        core: {
            fullscreenToggler: { turnOffFullscreen },
            globalResizingController: { runAllResizingActions },
            eventsControllers: {
                window: {
                    resize: {
                        removeListener: removeResizeListener,
                        attachListener: attachResizeListener
                    },
                    swiping: {
                        removeListeners: removeSwipingListeners,
                        attachListeners: attachSwipingListeners,
                    }
                }
            }
        },
    }
) {
    const documentClassList = document.documentElement.classList;
    let fadingOut = false;

    this.openLightbox = () => {
        setState({
            isOpen: true,
        }, () => {
            componentMountedAfterOpen();
            this.addOpeningClassToDocument();
        });
    };

    this.addOpeningClassToDocument = () => {
        documentClassList.add(FSLIGHTBOX_OPEN_CLASS_NAME);
    };

    this.closeLightbox = () => {
        if (fadingOut) return;
        fadingOut = true;
        getContainerClassList().add(LONG_FADE_OUT_CLASS_NAME);
        removeSwipingListeners();
        if (isFullscreenOpenState.get()) {
            turnOffFullscreen();
        }
        setTimeout(() => {
            afterFadeOut();
        }, CONTAINER_FADE_OUT_TIME);
    };

    const componentMountedAfterOpen = () => {
        if (!data.isInitialized) {
            initialize();
            return;
        }
        attachResizeListener();
        attachSwipingListeners();
        runAllResizingActions();
    };

    const afterFadeOut = () => {
        getContainerClassList().remove(LONG_FADE_OUT_CLASS_NAME);
        fadingOut = false;
        documentClassList.remove(FSLIGHTBOX_OPEN_CLASS_NAME);
        setState({
            isOpen: false
        });
        removeResizeListener();
    };

    const getContainerClassList = () => {
        return container.current.classList;
    };
}