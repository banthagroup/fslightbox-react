/**
 * @class
 * @param { FsLightbox.core.slideSwiping.move.listener | Function } listener
 */
export function WindowMoveEventController({ core: { slideSwiping: { move: { listener } } } }) {
    this.attachListener = () => {
        window.addEventListener('mousemove', listener);
        window.addEventListener('touchmove', listener, { passive: true });
    };

    this.removeListener = () => {
        window.removeEventListener('mousemove', listener);
        window.removeEventListener('touchmove', listener,);
    };
}