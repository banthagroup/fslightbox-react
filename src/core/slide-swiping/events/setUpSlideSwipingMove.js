import { SlideSwipingMoveActions } from "../actions/move/SlideSwipingMoveActions";
import { getAnimationDebounce } from "../../animations/getAnimationDebounce";

export function setUpSlideSwipingMove(
    {
        data,
        injector: {
            injectDependency
        },
        core: {
            animationer,
            slideSwiping: {
                move: self
            }
        }
    }, swipingProps
) {
    const actions = injectDependency(SlideSwipingMoveActions, [swipingProps]);
    const isPreviousAnimationDebounced = getAnimationDebounce();

    self.listener = (e) => {
        if (!data.isSwipingSlides || swipingProps.isAfterSwipeAnimationRunning) {
            return;
        }
        if (!isPreviousAnimationDebounced()) {
            return;
        }
        actions.setMoveEvent(e);
        actions.runActions();
    };

    const ifThereIsOnlyOneSlideRewriteListener = () => {
        if (data.totalSlides === 1)
            self.listener = simulateSwipe;
    };

    const simulateSwipe = () => {
        swipingProps.swipedDifference = 1;
    };

    ifThereIsOnlyOneSlideRewriteListener();
}
