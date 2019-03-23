/**
 * @class WindowUpEventController
 * @param { FsLightbox.core.slideSwiping.up | SlideSwipingUp } up
 */
export function WindowUpEventController({ core: { slideSwiping: { up } } }) {
    this.attachListener = () => {
        window.addEventListener('mouseup', up.listener);
        window.addEventListener('touchend', up.listener, { passive: true });
    };

    this.removeListener = () => {
        window.removeEventListener('mouseup', up.listener);
        window.removeEventListener('touchend', up.listener, { passive: true });
    };
}