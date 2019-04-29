import { CURSOR_GRABBING_CLASS_NAME, FADE_IN_ANIMATION_TIME } from "../../../../constants/cssConstants";

/**
 * @constructor
 * @param { FsLightbox.data | { totalSlides: number } } data
 * @param { FsLightbox.componentsStates.hasMovedWhileSwiping | { get: function(): boolean, set: function(boolean)} } isSwipingSlidesState
 * @param { FsLightbox.componentsStates.slide | { get: function(): number, set: function(number)} } slideState
 * @param { FsLightbox.setters.setState | Function } setState
 * @param { FsLightbox.core.stage | Stage } stage
 * @param { FsLightbox.core.sourceHoldersTransformer | SourceHoldersTransformer } sourceHoldersTransformer
 * @param { FsLightbox.injector.slideSwiping.getSwipingTransitioner | function(): SwipingTransitioner } getSwipingTransitioner
 * @param { FsLightbox.injector.slideSwiping.getSwipingSlideChangerForSwipingTransitioner | function(): SwipingSlideChanger } getSwipingSlideChangerForSwipingTransitioner
 * @param { {downClientX, isAfterSwipeAnimationRunning, swipedDifference, isSourceDownEventTarget} } swipingProps
 */
export function SlideSwipingUpActions(
    {
        data,
        componentsStates: {
            hasMovedWhileSwiping: hasMovedWhileSwipingState,
            slide: slideState,
        },
        core: {
            stage,
            sourceHoldersTransformer,
        },
        injector: {
            slideSwiping: {
                getSwipingTransitioner,
                getSwipingSlideChangerForSwipingTransitioner
            }
        },
        elements: {
            container
        }
    }, swipingProps
) {
    const transitioner = getSwipingTransitioner();
    const slideChanger = getSwipingSlideChangerForSwipingTransitioner(transitioner);
    let transformSourceHolders;
    let transformSourceHoldersBackward;
    let transformSourceHoldersForward;

    this.setUpTransformSourceHolders = () => {
        if (data.totalSlides === 1) {
            transformSourceHolders = () => {
                transitioner.addTransitionToCurrent();
                sourceHoldersTransformer.transformStageSourceHolderAtIndex(0).zero();
            };
            return;
        }
        setUpTransformSourceHoldersBackward();
        setUpTransformSourceHoldersForward();
        transformSourceHolders = () => {
            (swipingProps.swipedDifference < 0) ?
                transformSourceHoldersForward() :
                transformSourceHoldersBackward();
        }
    };

    this.resetSwiping = () => {
        hasMovedWhileSwipingState.set(false);
        data.isSwipingSlides = false;
        container.current.classList.remove(CURSOR_GRABBING_CLASS_NAME);
    };

    const setUpTransformSourceHoldersBackward = () => {
        (areThereMoreThanTwoSlides()) ?
            transformSourceHoldersBackward = () => slideChanger.changeSlideToPrevious() :
            transformSourceHoldersBackward = transformSourceHoldersBackwardIfThereAreTwoSlides;
    };

    const transformSourceHoldersBackwardIfThereAreTwoSlides = () => {
        (isSlideEqualsOne()) ?
            addTransitionToCurrentAndTransformStageSourceHolders() :
            slideChanger.changeSlideToPrevious();
    };


    const setUpTransformSourceHoldersForward = () => {
        (areThereMoreThanTwoSlides()) ?
            transformSourceHoldersForward = () => slideChanger.changeSlideToNext() :
            transformSourceHoldersForward = transformSourceHoldersForwardIfThereAreTwoSlides;
    };

    const transformSourceHoldersForwardIfThereAreTwoSlides = () => {
        (isSlideEqualsOne()) ?
            slideChanger.changeSlideToNext() :
            addTransitionToCurrentAndTransformStageSourceHolders();
    };

    const areThereMoreThanTwoSlides = () => {
        return data.totalSlides > 2;
    };

    const isSlideEqualsOne = () => {
        return slideState.get() === 1;
    };

    const addTransitionToCurrentAndTransformStageSourceHolders = () => {
        transitioner.addTransitionToCurrent();
        sourceHoldersTransformer.transformStageSourceHolders();
    };

    this.runActions = () => {
        const stageSourcesIndexes = stage.getAllStageIndexes();
        transitioner.setStageSourcesIndexes(stageSourcesIndexes);
        slideChanger.setStageSourcesIndexes(stageSourcesIndexes);

        transformSourceHolders();

        swipingProps.isAfterSwipeAnimationRunning = true;
        swipingProps.swipedDifference = 0;

        setTimeout(() => {
            transitioner.removeAllTransitionsFromStageSources();
            swipingProps.isAfterSwipeAnimationRunning = false;
        }, FADE_IN_ANIMATION_TIME);
    };
}
