/**
 * @constructor
 * @param { FsLightbox.injector.slideSwiping.getUpActionsForSwipingProps
 * | function: SlideSwipingUpActions } getUpActionsForSwipingProps
 * @param { FsLightbox.core.lightboxCloser | LightboxCloser } lightboxCloser
 * @param { {downClientX, isAfterSwipeAnimationRunning, swipedDifference, isSourceDownEventTarget} } swipingProps
 */
export function SlideSwipingUp(
    {
        data,
        injector: {
            slideSwiping: {
                getUpActionsForSwipingProps,
            }
        },
        core: { lightboxCloser },
    }, swipingProps
) {
    const actions = getUpActionsForSwipingProps(swipingProps);
    actions.setUpTransformSourceHolders();

    this.listener = () => {
        if (!data.isSwipingSlides || swipingProps.isAfterSwipeAnimationRunning) {
            return;
        }
        actions.resetSwiping();
        if (!hasUserSwiped()) {
            return ifSourceIsNotEventTargetCloseLightbox();
        }
        actions.runActions();
    };

    const hasUserSwiped = () => {
        return swipingProps.swipedDifference !== 0;
    };

    const ifSourceIsNotEventTargetCloseLightbox = () => {
        if (!swipingProps.isSourceDownEventTarget)
            lightboxCloser.closeLightbox();
    };
}