import {
    FSLIGHTBOX_OPEN_CLASS_NAME,
    LONG_FADE_OUT_CLASS_NAME
} from "../../../constants/cssConstants";
import { CONTAINER_FADE_OUT_TIME } from "../../../constants/coreConstants";
import { documentElementClassList } from "../../../helpers/dom/document/documentElementClassList";
import { ON_CLOSE } from "../../../constants/eventsConstants";

/**
 * @constructor
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
        eventsDispatcher: {
            dispatch
        },
        core: {
            eventsControllers: {
                window: {
                    resize: windowResizeEventController,
                    swiping: swipingEventsControllersFacade
                },
                document: {
                    keyDown: keyDownEventController
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
        keyDownEventController.removeListener();
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
        this.isLightboxFadingOut = false;
        getLightboxContainerClassList().remove(LONG_FADE_OUT_CLASS_NAME);
        documentElementClassList.remove(FSLIGHTBOX_OPEN_CLASS_NAME);
        scrollbarRecompensor.removeRecompense();
        windowResizeEventController.removeListener();
        setState({
            isOpen: false
        }, () => {
            dispatch(ON_CLOSE);
        });
    };

    /** @return { DOMTokenList } */
    const getLightboxContainerClassList = () => {
        return lightboxContainer.current.classList;
    };
}