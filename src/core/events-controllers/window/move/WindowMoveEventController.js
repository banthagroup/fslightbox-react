/**
 * @class
 * @param { FsLightbox.core.slideSwiping.move | SlideSwipingMove } slideSwipingMove
 */
export function WindowMoveEventController({ core: { slideSwiping: { move: slideSwipingMove  } } }) {
    this.attachListener = () => {
        window.addEventListener('mousemove', slideSwipingMove.listener);
        window.addEventListener('touchmove', slideSwipingMove.listener, { passive: true });
    };

    this.removeListener = () => {
        window.removeEventListener('mousemove', slideSwipingMove.listener);
        window.removeEventListener('touchmove', slideSwipingMove.listener,);
    };
}