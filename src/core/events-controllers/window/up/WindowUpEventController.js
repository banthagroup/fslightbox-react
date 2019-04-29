/**
 * @constructor
 * @param { FsLightbox.core.slideSwiping.up | SlideSwipingUp } slideSwipingUp
 */
export function WindowUpEventController({ core: { slideSwiping: { up: slideSwipingUp } } }) {
    this.attachListener = () => {
        window.addEventListener('mouseup', slideSwipingUp.listener);
        window.addEventListener('touchend', slideSwipingUp.listener, { passive: true });
    };

    this.removeListener = () => {
        window.removeEventListener('mouseup', slideSwipingUp.listener);
        window.removeEventListener('touchend', slideSwipingUp.listener);
    };
}