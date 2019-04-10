/**
 * @class SlideSwipingMove
 * @param { FsLightbox.getters.getIsSwipingSlides | function(): boolean } getIsSwipingSlides
 * @param { FsLightbox.injector.slideSwiping.getMoveActionsForSwipingProps | Function } getMoveActionsForSwipingProps
 * @param { {downClientX, isAfterSwipeAnimationRunning, swipedDifference} } swipingProps
 */
export function SlideSwipingMove(
    {
        data,
        componentsStates: {
            isSwipingSlides: isSwipingSlidesState
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
        // if there is only 1 slide swiping actions are disabled
        // so to prevent lightbox from closing if user swiped we simply set swipedDifference to 1
        if(isThereOnlyOneSlide()) {
            simulateSwipe();
            return;
        }
        if (!isSwipingSlidesState.get() || swipingProps.isAfterSwipeAnimationRunning) {
            return;
        }
        actions.setMoveEvent(e);
        actions.runActions();
    };

    const isThereOnlyOneSlide = () => {
        return data.totalSlides === 1;
    };

    const simulateSwipe = () => {
        swipingProps.swipedDifference = 1;
    };
}