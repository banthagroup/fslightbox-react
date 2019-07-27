import { SlideSwipingMoveActions } from "../actions/move/SlideSwipingMoveActions";
import { getAnimationDebounce } from "../../animations/getAnimationDebounce";

export function setUpSlideSwipingMove(
    {
        data,
        injector: {
            resolve
        },
        core: {
            animationer,
            slideSwiping: {
                move: self
            }
        }
    }, swipingProps
) {
    const actions = resolve(SlideSwipingMoveActions, [swipingProps]);
    const isPreviousAnimationDebounced = getAnimationDebounce();

    (data.sourcesCount === 1) ?
        self.listener = () => {
            // if there is only one slide we need to simulate swipe to prevent lightbox from closing
            swipingProps.swipedDifference = 1;
        } :
        self.listener = (e) => {
            if (!data.isSwipingSlides || swipingProps.isAfterSwipeAnimationRunning) {
                return;
            }
            
            if (!isPreviousAnimationDebounced()) {
                return;
            }
            
            actions.runActionsForEvent(e);
        };
}
