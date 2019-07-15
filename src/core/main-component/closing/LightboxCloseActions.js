import { ON_CLOSE } from "../../../constants/eventsConstants";
import { LONG_FADE_OUT_CLASS_NAME, OPEN_CLASS_NAME } from "../../../constants/classes-names";
import { ANIMATION_TIME } from "../../../constants/css-constants";
import { LIGHTBOX_CONTAINER } from "../../../constants/elements";

export function LightboxCloseActions(
    {
        componentsStates: {
            isFullscreenOpen: isFullscreenOpenState
        },
        core: {
            classListManager,
            eventsControllers: {
                window: {
                    resize: windowResizeEventController,
                    swiping: swipingEventsControllersFacade
                },
                document: {
                    keyDown: keyDownEventController
                }
            },
            eventsDispatcher,
            fullscreenToggler,
            scrollbarRecompensor
        },
        setMainComponentState
    }
) {
    this.isLightboxFadingOut = false;

    this.runActions = () => {
        this.isLightboxFadingOut = true;

        classListManager
            .manageElement(LIGHTBOX_CONTAINER)
            .add(LONG_FADE_OUT_CLASS_NAME);

        swipingEventsControllersFacade.removeListeners();
        keyDownEventController.removeListener();

        if (isFullscreenOpenState.get()) {
            fullscreenToggler.turnOffFullscreen();
        }

        setTimeout(() => {
            this.isLightboxFadingOut = false;

            classListManager
                .manageElement(LIGHTBOX_CONTAINER)
                .remove(LONG_FADE_OUT_CLASS_NAME);

            document.documentElement.classList.remove(OPEN_CLASS_NAME);

            scrollbarRecompensor.removeRecompense();
            windowResizeEventController.removeListener();

            setMainComponentState({
                isOpen: false
            }, () => {
                eventsDispatcher.dispatch(ON_CLOSE);
            });
        }, ANIMATION_TIME);
    };
}
