/**
 * @class
 * @param { FsLightbox.injector.slideSwiping.getUpActionsForSwipingProps
 * | function: SlideSwipingUpActions } getUpActionsForSwipingProps
 * @param { FsLightbox.core | Core } core
 * @param { {downClientX, isAfterSwipeAnimationRunning, swipedDifference, isSourceDownEventTarget} } swipingProps
 */
export function SlideSwipingUp(
    {
        componentsStates: {
            isSwipingSlides: isSwipingSlidesState
        },
        injector: {
            slideSwiping: {
                getUpActionsForSwipingProps,
            }
        },
        core,
    }, swipingProps
) {
    const actions = getUpActionsForSwipingProps(swipingProps);
    actions.setUpTransformSourceHolders();

    this.listener = () => {
        if (!isSwipingSlidesState.get() || swipingProps.isAfterSwipeAnimationRunning) {
            return;
        }
        if (!hasUserSwiped()) {
            return resetSwipingAndCloseLightboxIfSourceIsNotDownEventTarget();
        }
        actions.runActions();
    };

    const hasUserSwiped = () => {
        return swipingProps.swipedDifference !== 0;
    };

    const resetSwipingAndCloseLightboxIfSourceIsNotDownEventTarget = () => {
        isSwipingSlidesState.set(false);
        ifSourceIsNotEventTargetCloseLightbox();
    };

    const ifSourceIsNotEventTargetCloseLightbox = () => {
        if (!swipingProps.isSourceDownEventTarget)
            core.lightboxCloser.closeLightbox();
    };
}