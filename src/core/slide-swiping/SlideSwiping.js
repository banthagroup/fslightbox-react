import { SlideSwipingDown } from "./events/SlideSwipingDown";
import { SlideSwipingMove } from "./events/SlideSwipingMove";
import { SlideSwipingUp } from "./events/SlideSwipingUp";

/**
 * @class SlideSwiping
 */
export function SlideSwiping(fsLightbox) {
    const swipingProps = {
        downClientX: 0,
        isAfterSwipeAnimationRunning: false,
        swipedDifference: 0,
        isSourceDownEventTarget: false,
    };

    this.down = new SlideSwipingDown(fsLightbox, swipingProps);
    this.move = new SlideSwipingMove(fsLightbox, swipingProps);
    this.up = new SlideSwipingUp(fsLightbox, swipingProps);
}