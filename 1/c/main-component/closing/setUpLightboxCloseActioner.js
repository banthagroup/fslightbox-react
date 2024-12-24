import { FADE_OUT_STRONG_CLASS_NAME } from "../../../cn/classes-names";
import { ANIMATION_TIME } from "../../../cn/css-constants";

export function setUpLightboxCloseActioner(
    {
        componentsServices: { isLightboxOpenManager },
        core: {
            globalEventsController,
            lightboxCloseActioner: self,
            scrollbarRecompensor
        },
	e,
        elements: { container: lightboxContainer },
	fs,
	fss,
	p,
        props,
        timeout
    }
) {
    self.isLightboxFadingOut = false;

    self.runActions = () => {
        self.isLightboxFadingOut = true;

        lightboxContainer.current.classList.add(FADE_OUT_STRONG_CLASS_NAME);

        globalEventsController.removeListeners();

        if (props.exitFullscreenOnClose && fss.g()) fs.x();

        timeout(() => {
            self.isLightboxFadingOut = false;

            p.isSwiping = false;

            lightboxContainer.current.classList.remove(FADE_OUT_STRONG_CLASS_NAME);

            document.documentElement.classList.remove("fslightbox-open");

            scrollbarRecompensor.removeRecompense();

            isLightboxOpenManager.set(false);

            e("onClose");
        }, ANIMATION_TIME - 30);
    };
}
