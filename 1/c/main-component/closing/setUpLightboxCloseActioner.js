import { FADE_OUT_STRONG_CLASS_NAME, OPEN_CLASS_NAME } from "../../../cn/classes-names";
import { ANIMATION_TIME } from "../../../cn/css-constants";

export function setUpLightboxCloseActioner(
    {
        componentsServices: { toolbarButtons: { fullscreen: isFullscreenOpenState }, isLightboxOpenManager },
        core: {
            eventsDispatcher,
            globalEventsController,
            lightboxCloseActioner: self,
            scrollbarRecompensor
        },
        elements: { container: lightboxContainer },
	fs,
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
            fs.exitFullscreen();
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
