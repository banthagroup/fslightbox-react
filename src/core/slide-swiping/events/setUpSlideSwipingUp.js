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
    actions.setUpTransformSourceHolders();

    self.listener = () => {
        if (!data.isSwipingSlides || swipingProps.isAfterSwipeAnimationRunning) {
            return;
        }
        actions.resetSwiping();
        if (!hasUserSwiped()) {
            return ifSourceIsNotEventTargetCloseLightbox();
        }
        actions.runActions();
    };

    const hasUserSwiped = () => {
        return swipingProps.swipedDifference !== 0;
    };

    const ifSourceIsNotEventTargetCloseLightbox = () => {
        if (!swipingProps.isSourceDownEventTarget)
            lightboxCloser.closeLightbox();
    };
}
