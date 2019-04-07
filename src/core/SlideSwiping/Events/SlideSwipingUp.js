// TODO: JS DOC FOR ALL SLIDE SWIPING DOWN
// TODO: TESTS FOR ALL SLIDE SWIPING DOWN

/**
 * @class
 * @param { FsLightbox } fsLightbox
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
                getUpActionsForSwipingProps,
            }
        },
        core,
    }, swipingProps
) {
    /** @var { SlideSwipingUpActions } actions */
    const actions = getUpActionsForSwipingProps(swipingProps);
    actions.setUpMethodsAccordingToNumberOfSlides();

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
        setters.setState({
            isSwipingSlides: false
        }, ifSourceIsNotEventTargetCloseLightbox);
    };

    const ifSourceIsNotEventTargetCloseLightbox = () => {
        if (!swipingProps.isSourceDownEventTarget)
            core.closeOpenLightbox.closeLightbox();
    };
}