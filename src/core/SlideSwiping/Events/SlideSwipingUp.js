/**
 * @class
 * @param { FsLightbox.setters.setState | Function } setState
 * @param { FsLightbox.getters.getIsSwipingSlides | function: boolean } getIsSwipingSlides
 * @param { FsLightbox.injector.slideSwiping.getUpActionsForSwipingProps
 * | function: SlideSwipingUpActions } getUpActionsForSwipingProps
 * @param { FsLightbox.core | Core } core
 * @param { {downClientX, isAfterSwipeAnimationRunning, swipedDifference, isSourceDownEventTarget} } swipingProps
 */
export function SlideSwipingUp(
    {
        setters: {
            setState
        },
        getters: {
            getIsSwipingSlides
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
        if (!getIsSwipingSlides() || swipingProps.isAfterSwipeAnimationRunning) {
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
        setState({
            isSwipingSlides: false
        }, ifSourceIsNotEventTargetCloseLightbox);
    };

    const ifSourceIsNotEventTargetCloseLightbox = () => {
        if (!swipingProps.isSourceDownEventTarget)
            core.closeOpenLightbox.closeLightbox();
    };
}