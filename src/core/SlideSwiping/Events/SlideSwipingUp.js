/**
 * @class
 * @param { FsLightbox.getters.getIsSwipingSlides | function(): boolean } getIsSwipingSlides
 * @param { FsLightbox.injector.slideSwiping.getUpActionsForSwipingProps | Function } getUpActionsForSwipingProps
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
        // TODO: TEST AND REFACTOR
        if(swipingProps.swipedDifference === 0 && !swipingProps.isSourceDownEventTarget) {
            setters.setState({
                isSwipingSlides: false
            }, () => {
                core.closeOpenLightbox.closeLightbox();
            });
            return;
        }
        // TODO: TEST AND REFACTOR
        swipingProps.isSourceDownEventTarget = false;

        // TODO THIS NO LONGER NEED EVENT TEST IT
        // actions.setUpEvent(e);

        actions.runActions();
    };
}