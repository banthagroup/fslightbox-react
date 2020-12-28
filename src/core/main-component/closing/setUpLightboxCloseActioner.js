import { FADE_OUT_STRONG_CLASS_NAME, OPEN_CLASS_NAME } from "../../../constants/classes-names";
import { ANIMATION_TIME } from "../../../constants/css-constants";

export function setUpLightboxCloseActioner(
    {
        componentsServices: { toolbarButtons: { fullscreen: isFullscreenOpenState }, isLightboxOpenManager },
        core: {
            eventsDispatcher,
            fullscreenToggler,
            globalEventsController,
            lightboxCloseActioner: self,
            scrollbarRecompensor
        },
        elements: { container: lightboxContainer },
        props,
        slideSwipingProps,
        timeout
    }
) {
    self.isLightboxFadingOut = false;

    self.runActions = () => {
        self.isLightboxFadingOut = true;

        lightboxContainer.current.classList.add(FADE_OUT_STRONG_CLASS_NAME);

        globalEventsController.removeListeners();

        if (props.exitFullscreenOnClose && isFullscreenOpenState.get()) {
            fullscreenToggler.exitFullscreen();
        }

        timeout(() => {
            self.isLightboxFadingOut = false;

            slideSwipingProps.isSwiping = false;

            lightboxContainer.current.classList.remove(FADE_OUT_STRONG_CLASS_NAME);

            document.documentElement.classList.remove(OPEN_CLASS_NAME);

            scrollbarRecompensor.removeRecompense();

            isLightboxOpenManager.set(false);

            eventsDispatcher.dispatch('onClose');
        }, ANIMATION_TIME);
    };
}
