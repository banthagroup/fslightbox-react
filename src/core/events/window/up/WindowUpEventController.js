/**
 * @constructor
 */
export function WindowUpEventController({ core: { slideSwiping: { up: slideSwipingUp } } }) {
    this.attachListener = () => {
        addEventListener('mouseup', slideSwipingUp.listener);
        addEventListener('touchend', slideSwipingUp.listener, { passive: true });
    };

    this.removeListener = () => {
        removeEventListener('mouseup', slideSwipingUp.listener);
        removeEventListener('touchend', slideSwipingUp.listener);
    };
}
