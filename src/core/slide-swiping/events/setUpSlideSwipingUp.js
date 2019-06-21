import { SlideSwipingUpActions } from "../actions/up/SlideSwipingUpActions";

export function setUpSlideSwipingUp(
    {
        data,
        injector: {
            injectDependency
        },
        core: {
            lightboxCloser,
            slideSwiping: {
                up: self
            }
        },
    }, swipingProps
) {
    const actions = injectDependency(SlideSwipingUpActions, [swipingProps]);

    self.listener = () => {
        if (!data.isSwipingSlides || swipingProps.isAfterSwipeAnimationRunning) {
            return;
        }

        actions.resetSwiping();

        if (swipingProps.swipedDifference === 0) {
            if (!swipingProps.isSourceDownEventTarget)
                lightboxCloser.closeLightbox();
            return;
        }

        actions.runActions();
    };
}
