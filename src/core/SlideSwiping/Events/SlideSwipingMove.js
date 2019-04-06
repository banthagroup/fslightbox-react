/**
 * @class SlideSwipingMove
 * @param { FsLightbox.getters.getIsSwipingSlides | function(): boolean } getIsSwipingSlides
 * @param { FsLightbox.injector.slideSwiping.getMoveActionsForSwipingProps | Function } getMoveActionsForSwipingProps
 * @param { {downClientX, isAfterSwipeAnimationRunning, swipedDifference} } swipingProps
 */
export function SlideSwipingMove(
    {
        data,
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
        // TODO: TEST
        // if there is only 1 slide swiping actions are disabled so if user swiped to prevent lightbox from closing
        // we simply set swipedDifference to 1
        if(data.totalSlides === 1) {
            simulateSwipe();
            return;
        }
        if (!getIsSwipingSlides() || swipingProps.isAfterSwipeAnimationRunning) {
            return;
        }
        actions.setMoveEvent(e);
        actions.runActions();
    };

    const simulateSwipe = () => {
        swipingProps.swipedDifference = 1;
    };
}