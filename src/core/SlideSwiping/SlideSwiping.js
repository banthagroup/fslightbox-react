import { SlideSwipingDown } from "./SwipingEvents/SlideSwipingDown";
import { SlideSwipingMove } from "./SwipingEvents/SlideSwipingMove";
import { SlideSwipingUp } from "./SwipingEvents/SlideSwipingUp";

/**
 * @class SlideSwiping
 */
export function SlideSwiping({ setters: { setState } }) {
    const swipingProps = {
        downClientX: 0,
        isAfterSwipeAnimationRunning: false,
        swipedDifference: 0,
    };

    this.down = new SlideSwipingDown(setState, swipingProps);
    this.move = new SlideSwipingMove(swipingProps);
    this.up = new SlideSwipingUp(swipingProps);
}