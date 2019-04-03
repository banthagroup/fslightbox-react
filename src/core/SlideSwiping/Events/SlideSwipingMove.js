/**
 * @class SlideSwipingMove
 * @param { FsLightbox.getters.getIsSwipingSlides | function(): boolean } getIsSwipingSlides
 * @param { FsLightbox.injector.slideSwiping.getMoveActionsForSwipingProps | Function } getMoveActionsForSwipingProps
 * @param { {downClientX, isAfterSwipeAnimationRunning, swipedDifference} } swipingProps
 */
export function SlideSwipingMove(
    {
        getters: {
            getIsSwipingSlides
        },
        injector: {
            slideSwiping: {
                getMoveActionsForSwipingProps
            }
        }
    }, swipingProps
) {
    /** @var { SlideSwipingMoveActions } actions */
    const actions = getMoveActionsForSwipingProps(swipingProps);

    this.listener = (e) => {
        if (!getIsSwipingSlides() || swipingProps.isAfterSwipeAnimationRunning) {
            return;
        }
        actions.setMoveEvent(e);
        actions.runActions();
    };
}