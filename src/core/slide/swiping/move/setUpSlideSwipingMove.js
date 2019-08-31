import { SlideSwipingMoveActioner } from "./SlideSwipingMoveActioner";
import { getAnimationDebounce } from "../../../animations/getAnimationDebounce";

export function setUpSlideSwipingMove(
    {
        core: { slideSwiping: { move: self } },
        data,
        injector: { resolve },
        slideSwipingProps
    },
) {
    const slideSwipingMoveActioner = resolve(SlideSwipingMoveActioner);
    const isPreviousAnimationDebounced = getAnimationDebounce();

    (data.sourcesCount === 1) ?
        self.listener = () => {
            // if there is only one slide we need to simulate swipe to prevent lightbox from closing
            slideSwipingProps.swipedX = 1;
        } :
        self.listener = (e) => {
            if (slideSwipingProps.isSwiping && isPreviousAnimationDebounced()) {
                slideSwipingMoveActioner.runActionsForEvent(e);
            }
        };
}
