import { CONTAINER_FADE_OUT_TIME } from "../constants/CoreConstants";
import { FADE_OUT_COMPLETE_CLASS_NAME, FSLIGHTBOX_OPEN_CLASS_NAME } from "../constants/CssConstants";

/**
 * @class CloseOpenLightbox
 * @param { { current } } container
 * @param { FsLightbox.core.sourceHoldersTransformer | SourceHoldersTransformer  } sourceHoldersTransformer
 * @param { FsLightbox.core.fullscreenToggler | FullscreenToggler  } fullscreenToggler
 * @param { FsLightbox.core.sizeController | SizeController  } sizeController
 * @param { FsLightbox.core.eventsControllers.window.resize | WindowResizeEventController  } windowResizeEventController
 * @param { FsLightbox.core.eventsControllers.window.swiping | SwipingEventsControllersFacade } swipingEventsControllersFacade
 * @param { FsLightbox.data } data
 * @param { FsLightbox.setters.setState | Function } setState
 * @param { FsLightbox.initialize | Function } initialize
 */
export function CloseOpenLightbox(
    {
        elements: { container },
        core: {
            sourceHoldersTransformer,
            fullscreenToggler,
            sizeController,
            eventsControllers: {
                window: {
                    resize: windowResizeEventController,
                    swiping: swipingEventsControllersFacade
                }
            }
        },
        data,
        setters: { setState },
        getters: { initialize },
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
        container.current.classList.add(FADE_OUT_COMPLETE_CLASS_NAME);
        swipingEventsControllersFacade.removeListeners();
        if (data.isFullscreenOpen) {
            fullscreenToggler.turnOffFullscreen();
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
        windowResizeEventController.attachListener();
        swipingEventsControllersFacade.attachListeners();
        sizeController.adjustMediaHolderSize();
        sourceHoldersTransformer.transformStageSourceHolders().withoutTimeout();
    };

    const afterFadeOut = () => {
        container.current.classList.remove(FADE_OUT_COMPLETE_CLASS_NAME);
        fadingOut = false;
        documentClassList.remove(FSLIGHTBOX_OPEN_CLASS_NAME);
        setState({
            isOpen: false
        });
        windowResizeEventController.removeListener();
    };
}