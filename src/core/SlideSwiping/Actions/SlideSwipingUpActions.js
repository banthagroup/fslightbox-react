/**
 * @class
 * @param { FsLightbox } fsLightbox
 * @param { {downClientX, isAfterSwipeAnimationRunning, swipedDifference} } swipingProps
 */
export function SlideSwipingUpActions(fsLightbox, swipingProps) {
    const swipingTransitioner = fsLightbox.injector.slideSwiping.getSwipingTransitioner();
    const swipingSlideChanger = fsLightbox.injector.slideSwiping.getSwipingSlideChangerForSwipingTransitioner(swipingTransitioner);

    this.runActions = () => {
        const stageSourcesIndexes = fsLightbox.core.stageSources.getAllStageIndexes();
        swipingTransitioner.setStageSourcesIndexes(stageSourcesIndexes);
        swipingSlideChanger.setStageSourcesIndexes(stageSourcesIndexes);

        (swipingProps.swipedDifference < 0) ?
            transformSourceHoldersForward() :
            transformSourceHoldersBackward();

        swipingProps.isAfterSwipeAnimationRunning = true;
        fsLightbox.setters.setState({
            isSwipingSlides: false
        });
        swipingProps.swipedDifference = 0;

        setTimeout(() => {
            swipingTransitioner.removeAll();
            swipingProps.isAfterSwipeAnimationRunning = false;
        }, 250);
    };

    const transformSourceHoldersForward = () => {
        if (fsLightbox.data.totalSlides >= 3) {
            swipingSlideChanger.changeSlideToNext();
        } else if (fsLightbox.data.totalSlides === 2) {
            if (fsLightbox.getters.getSlide() === 1) {
                swipingSlideChanger.changeSlideToNext();
            } else {
                swipingTransitioner.addTransitionToCurrent();
                fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders();
            }
        } else {
            addTransitionToCurrentSlideAndTransformItToZero();
        }
    };

    const transformSourceHoldersBackward = () => {
        if (fsLightbox.data.totalSlides >= 3) {
            swipingSlideChanger.changeSlideToPrevious();
        } else if (fsLightbox.data.totalSlides === 2) {
            if (fsLightbox.getters.getSlide() === 1) {
                swipingTransitioner.addTransitionToCurrent();
                fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders();
            } else {
                swipingSlideChanger.changeSlideToPrevious();
            }
        } else {
            addTransitionToCurrentSlideAndTransformItToZero();
        }
    };

    const addTransitionToCurrentSlideAndTransformItToZero = () => {
        swipingTransitioner.addTransitionToCurrent();
        fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolderAtIndex(0).zero();
    };
}
