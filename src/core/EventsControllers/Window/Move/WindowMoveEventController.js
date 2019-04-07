/**
 * @class
 * @param { FsLightbox.core.slideSwiping.move | SlideSwipingMove } move
 */
export function WindowMoveEventController({ core: { slideSwiping: { move } } }) {
    this.attachListener = () => {
        window.addEventListener('mousemove', move.listener);
        window.addEventListener('touchmove', move.listener, { passive: true });
    };

    this.removeListener = () => {
        window.removeEventListener('mousemove', move.listener);
        window.removeEventListener('touchmove', move.listener,);
    };
}