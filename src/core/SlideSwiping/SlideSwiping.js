import { SlideSwipingDown } from "./SwipingEvents/SlideSwipingDown";
import { SlideSwipingMove } from "./SwipingEvents/SlideSwipingMove";
import { SlideSwipingUp } from "./SwipingEvents/SlideSwipingUp";

/**
 * @class SlideSwiping
 */
export function SlideSwiping(fsLightbox) {
    const swipingProperties = {
        _swipedDifference: 0,
        get swipedDifference() {
            return this._swipedDifference;
        },
        set swipedDifference(value) {
            this._swipedDifference = value;
        },

        _downClientX: 0,
        get downClientX() {
            return this._downClientX;
        },
        set downClientX(value) {
            this._downClientX = value;
        },

        _isAfterSwipeAnimationRunning: false,
        get isAfterSwipeAnimationRunning() {
            return this._isAfterSwipeAnimationRunning;
        },
        set isAfterSwipeAnimationRunning(isAnimationRunning) {
            this._isAfterSwipeAnimationRunning = isAnimationRunning;
        }
    };

    this.down = new SlideSwipingDown(fsLightbox, swipingProperties);
    this.move = new SlideSwipingMove(fsLightbox, swipingProperties);
    this.up = new SlideSwipingUp(fsLightbox, swipingProperties);
}