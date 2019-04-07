/**
 * @class
 * @param { FsLightbox.getters.getIsSwipingSlides | function(): boolean } getIsSwipingSlides
 * @param { FsLightbox.injector.slideSwiping.getUpActionsForSwipingProps | Function } getUpActionsForSwipingProps
 * @param { FsLightbox.core.closeOpenLightbox.closeLightbox | Function } closeLightbox
 * @param { {downClientX, isAfterSwipeAnimationRunning, swipedDifference, isSourceDownEventTarget} } swipingProps
 */
export function SlideSwipingUp(
    {
        setters,
        getters: {
            getIsSwipingSlides
        },
        injector: {
            slideSwiping: {
                getUpActionsForSwipingProps
            }
        },
        core,
    }, swipingProps
) {
    /** @var { SlideSwipingUpActions } actions */
    const actions = getUpActionsForSwipingProps(swipingProps);

    this.listener = () => {
        if (!getIsSwipingSlides() || swipingProps.isAfterSwipeAnimationRunning) {
            return;
        }
        if (!hasUserSwiped()) {
            return resetSwipingAndCloseLightboxIfNeeded();
        }
        actions.runActions();
    };

    const hasUserSwiped = () => {
        return swipingProps.swipedDifference !== 0;
    };

    const resetSwipingAndCloseLightboxIfNeeded = () => {
        setters.setState({
            isSwipingSlides: false
        }, ifSourceIsNotEventTargetCloseLightbox);
    };

    const ifSourceIsNotEventTargetCloseLightbox = () => {
        if (!swipingProps.isSourceDownEventTarget)
            core.closeOpenLightbox.closeLightbox();
    };
}