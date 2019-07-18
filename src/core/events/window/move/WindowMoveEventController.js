export function WindowMoveEventController(
    {
        core: {
            slideSwiping: {
                move: slideSwipingMove
            }
        }
    }) {
    this.attachListener = () => {
        addEventListener('mousemove', slideSwipingMove.listener);
        addEventListener('touchmove', slideSwipingMove.listener, { passive: true });
    };

    this.removeListener = () => {
        removeEventListener('mousemove', slideSwipingMove.listener);
        removeEventListener('touchmove', slideSwipingMove.listener);
    };
}
