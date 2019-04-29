import {
    FSLIGHTBOX_OPEN_CLASS_NAME,
    LONG_FADE_OUT_CLASS_NAME
} from "../../../constants/cssConstants";
import { CONTAINER_FADE_OUT_TIME } from "../../../constants/coreConstants";
import { documentElementClassList } from "../../../helpers/dom/document/documentElementClassList";

/**
 * @constructor
 * @param { FsLightbox.setters.setState | Function } setState
 * @param { FsLightbox.componentsStates.isFullscreenOpen | { get: Function } } isFullscreenOpenState
 * @param { FsLightbox.elements.container | { current: { classList: DOMTokenList} } } lightboxContainer
 * @param { FsLightbox.core.eventsControllers.window.resize | WindowResizeEventController } windowResizeEventController
 * @param { FsLightbox.core.eventsControllers.window.swiping | SwipingEventsControllersFacade } swipingEventsControllersFacade
 * @param { FsLightbox.core.fullscreenToggler | FullscreenToggler } fullscreenToggler
 * @param { FsLightbox.core.scrollbarRecompensor | ScrollbarRecompensor } scrollbarRecompensor
 */
export function LightboxClosingActions(
    {
        setters: { setState },
        componentsStates: {
            isFullscreenOpen: isFullscreenOpenState
        },
        elements: {
            container: lightboxContainer
        },
        core: {
            eventsControllers: {
                window: {
                    resize: windowResizeEventController,
                    swiping: swipingEventsControllersFacade
                }
            },
            fullscreenToggler,
            scrollbarRecompensor
        },
    }
) {
    this.isLightboxFadingOut = false;

    this.runActions = () => {
        this.isLightboxFadingOut = true;
        getLightboxContainerClassList().add(LONG_FADE_OUT_CLASS_NAME);
        swipingEventsControllersFacade.removeListeners();
        ifFullscreenIsOpenCloseIt();
        setTimeout(() => {
            afterFadeOut();
        }, CONTAINER_FADE_OUT_TIME);
    };

    const ifFullscreenIsOpenCloseIt = () => {
        if (isFullscreenOpenState.get()) {
            fullscreenToggler.turnOffFullscreen();
        }
    };

    const afterFadeOut = () => {
        getLightboxContainerClassList().remove(LONG_FADE_OUT_CLASS_NAME);
        documentElementClassList.remove(FSLIGHTBOX_OPEN_CLASS_NAME);
        scrollbarRecompensor.removeRecompense();
        setState({
            isOpen: false
        });
        windowResizeEventController.removeListener();
        this.isLightboxFadingOut = false;
    };

    /** @return { DOMTokenList } */
    const getLightboxContainerClassList = () => {
        return lightboxContainer.current.classList;
    };
}