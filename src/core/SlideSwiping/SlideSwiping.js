import { SlideSwipingDown } from "./Events/SlideSwipingDown";
import { SlideSwipingMove } from "./Events/SlideSwipingMove";
import { SlideSwipingUp } from "./Events/SlideSwipingUp";

/**
 * @class SlideSwiping
 */
export function SlideSwiping(fsLightbox) {
    const swipingProps = {
        downClientX: 0,
        isAfterSwipeAnimationRunning: false,
        swipedDifference: 0,
    };

    this.down = new SlideSwipingDown(fsLightbox, swipingProps);
    this.move = new SlideSwipingMove(fsLightbox, swipingProps);
    this.up = new SlideSwipingUp(fsLightbox, swipingProps);
}