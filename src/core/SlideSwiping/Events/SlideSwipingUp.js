/**
 * @class
 * @param { FsLightbox.getters.getIsSwipingSlides | function(): boolean } getIsSwipingSlides
 * @param { FsLightbox.injector.slideSwiping.getUpActionsForSwipingProps | Function } getUpActionsForSwipingProps
 * @param { {downClientX, isAfterSwipeAnimationRunning, swipedDifference} } swipingProps
 */
export function SlideSwipingUp(
    {
        getters: {
            getIsSwipingSlides
        },
        injector: {
            slideSwiping: {
                getUpActionsForSwipingProps
            }
        }
    }, swipingProps
) {
    /** @var { SlideSwipingUpActions } actions */
    const actions = getUpActionsForSwipingProps(swipingProps);

    this.listener = (e) => {
        if (!getIsSwipingSlides() || swipingProps.swipedDifference === 0 || swipingProps.isAfterSwipeAnimationRunning) {
            return;
        }
        actions.setUpEvent(e);
        actions.runActions();
    };
}