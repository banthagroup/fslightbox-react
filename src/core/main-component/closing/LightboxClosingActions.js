import {
    OPEN_CLASS_NAME,
    LONG_FADE_OUT_CLASS_NAME, ANIMATION_TIME
} from "../../../constants/css-constants";
import { CONTAINER_FADE_OUT_TIME } from "../../../constants/coreConstants";
import { ON_CLOSE } from "../../../constants/eventsConstants";
import { getDocumentElementClassList } from "../../../helpers/dom/document/getDocumentElementClassList";

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
        lightboxContainer.current.classList.add(LONG_FADE_OUT_CLASS_NAME);
        swipingEventsControllersFacade.removeListeners();
        keyDownEventController.removeListener();
        ifFullscreenIsOpenCloseIt();
        setTimeout(() => {
            afterFadeOut();
        }, ANIMATION_TIME);
    };

    const ifFullscreenIsOpenCloseIt = () => {
        if (isFullscreenOpenState.get()) {
            fullscreenToggler.turnOffFullscreen();
        }
    };

    const afterFadeOut = () => {
        this.isLightboxFadingOut = false;
        lightboxContainer.current.classList.remove(LONG_FADE_OUT_CLASS_NAME);
        getDocumentElementClassList().remove(OPEN_CLASS_NAME);
        scrollbarRecompensor.removeRecompense();
        windowResizeEventController.removeListener();
        setState({
            isOpen: false
        }, () => {
            dispatch(ON_CLOSE);
        });
    };
}
