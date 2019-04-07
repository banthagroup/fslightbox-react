/**
 * @class
 * @param { FsLightbox } fsLightbox
 * @param { {downClientX, isAfterSwipeAnimationRunning, swipedDifference, isSourceDownEventTarget} } swipingProps
 */
export function SlideSwipingUpActions(fsLightbox, swipingProps) {
    const swipingTransitioner = fsLightbox.injector.slideSwiping.getSwipingTransitioner();
    const swipingSlideChanger = fsLightbox.injector.slideSwiping.getSwipingSlideChangerForSwipingTransitioner(swipingTransitioner);

    this.runActions = () => {
        const stageSourcesIndexes = fsLightbox.core.stageSources.getAllStageIndexes();
        swipingTransitioner.setStageSourcesIndexes(stageSourcesIndexes);
        swipingSlideChanger.setStageSourcesIndexes(stageSourcesIndexes);

        transformSourceHolders();

        swipingProps.isAfterSwipeAnimationRunning = true;
        fsLightbox.setters.setState({
            isSwipingSlides: false
        });
        swipingProps.swipedDifference = 0;

        setTimeout(() => {
            swipingTransitioner.removeAllTransitionsFromStageSources();
            swipingProps.isAfterSwipeAnimationRunning = false;
        }, 250);
    };

    const transformSourceHolders = () => {
        if (fsLightbox.data.totalSlides === 1) {
            swipingTransitioner.addTransitionToCurrent();
            fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolderAtIndex(0).zero();
            return;
        }

        (swipingProps.swipedDifference < 0) ?
            transformSourceHoldersForward() :
            transformSourceHoldersBackward();
    };

    const transformSourceHoldersForward = () => {
        if (fsLightbox.data.totalSlides >= 3) {
            swipingSlideChanger.changeSlideToNext();
        } else {
            if (fsLightbox.getters.getSlide() === 1) {
                swipingSlideChanger.changeSlideToNext();
            } else {
                addTransitionToCurrentAndTransformStageSourceHolders();
            }
        }
    };

    const transformSourceHoldersBackward = () => {
        if (fsLightbox.data.totalSlides >= 3) {
            swipingSlideChanger.changeSlideToPrevious();
        } else {
            if (fsLightbox.getters.getSlide() === 1) {
                addTransitionToCurrentAndTransformStageSourceHolders();
            } else {
                swipingSlideChanger.changeSlideToPrevious();
            }
        }
    };

    const addTransitionToCurrentAndTransformStageSourceHolders = () => {
        swipingTransitioner.addTransitionToCurrent();
        fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders();
    };
}
