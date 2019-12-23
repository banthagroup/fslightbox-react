import { FADE_OUT_STRONG_CLASS_NAME, OPEN_CLASS_NAME } from "../../../constants/classes-names";
import { ANIMATION_TIME } from "../../../constants/css-constants";

export function setUpLightboxCloseActioner(
    {
        componentsServices: { toolbarButtons: { fullscreen: isFullscreenOpenState } },
        core: {
            eventsDispatcher,
            fullscreenToggler,
            globalEventsController,
            lightboxCloseActioner: self,
            scrollbarRecompensor
        },
        elements: { container: lightboxContainer },
        setMainComponentState,
        slideSwipingProps
    }
) {
    self.isLightboxFadingOut = false;

    self.runActions = () => {
        self.isLightboxFadingOut = true;

        lightboxContainer.current && lightboxContainer.current.classList.add(FADE_OUT_STRONG_CLASS_NAME);

        globalEventsController.removeListeners();

        if (lightboxContainer.current && isFullscreenOpenState.get()) {
            fullscreenToggler.exitFullscreen();
        }

        setTimeout(() => {
            self.isLightboxFadingOut = false;

            slideSwipingProps.isSwiping = false;

            lightboxContainer.current && lightboxContainer.current.classList.remove(FADE_OUT_STRONG_CLASS_NAME);

            document.documentElement.classList.remove(OPEN_CLASS_NAME);

            scrollbarRecompensor.removeRecompense();

            lightboxContainer.current && setMainComponentState({
                isOpen: false
            }, () => {
                eventsDispatcher.dispatch('onClose');
            });
        }, ANIMATION_TIME - 30);
    };
}
