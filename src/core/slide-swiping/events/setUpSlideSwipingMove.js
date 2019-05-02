import { SlideSwipingMoveActions } from "../actions/move/SlideSwipingMoveActions";

export function setUpSlideSwipingMove(
    {
        data,
        injector: {
            injectDependency
        },
        core: {
            slideSwiping: {
                move: self
            }
        }
    }, swipingProps
) {
    /** @var { SlideSwipingMoveActions } actions */
    const actions = injectDependency(SlideSwipingMoveActions, [swipingProps]);

    self.listener = (e) => {
        // if there is only 1 slide swiping actions are disabled
        // so to prevent lightbox from closing if user swiped we simply set swipedDifference to 1
        if (isThereOnlyOneSlide()) {
            simulateSwipe();
            return;
        }
        if (!data.isSwipingSlides || swipingProps.isAfterSwipeAnimationRunning) {
            return;
        }
        actions.setMoveEvent(e);
        actions.runActions();
    };

    const isThereOnlyOneSlide = () => {
        return data.totalSlides === 1;
    };

    const simulateSwipe = () => {
        swipingProps.swipedDifference = 1;
    };
}