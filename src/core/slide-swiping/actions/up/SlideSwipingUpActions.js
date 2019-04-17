import { FADE_IN_ANIMATION_TIME } from "../../../../constants/cssConstants";

/**
 * @class SlideSwipingUpActions
 * @param { FsLightbox.data } data
 * @param { FsLightbox.componentsStates.isSwipingSlides | { get: function(): boolean, set: function(boolean)} } isSwipingSlidesState
 * @param { FsLightbox.componentsStates.slide | { get: function(): number, set: function(number)} } slideState
 * @param { FsLightbox.setters.setState | Function } setState
 * @param { FsLightbox.core.sourceHoldersTransformer.transformStageSourceHolderAtIndex | function(): SourceHolderTransformer} transformStageSourceHolderAtIndex
 * @param { FsLightbox.injector.slideSwiping.getSwipingTransitioner | function(): SwipingTransitioner } getSwipingTransitioner
 * @param { FsLightbox.injector.slideSwiping.getSwipingSlideChangerForSwipingTransitioner | function(): SwipingSlideChanger } getSwipingSlideChangerForSwipingTransitioner
 * @param { {downClientX, isAfterSwipeAnimationRunning, swipedDifference, isSourceDownEventTarget} } swipingProps
 */
export function SlideSwipingUpActions(
    {
        data,
        componentsStates: {
            isSwipingSlides: isSwipingSlidesState,
            slide: slideState,
        },
        core: {
            stageSources: {
                getAllStageIndexes
            },
            sourceHoldersTransformer: {
                transformStageSourceHolders,
                transformStageSourceHolderAtIndex,
            },
        },
        injector: {
            slideSwiping: {
                getSwipingTransitioner,
                getSwipingSlideChangerForSwipingTransitioner
            }
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
                transformStageSourceHolderAtIndex(0).zero();
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
        transformStageSourceHolders();
    };

    this.runActions = () => {
        const stageSourcesIndexes = getAllStageIndexes();
        transitioner.setStageSourcesIndexes(stageSourcesIndexes);
        slideChanger.setStageSourcesIndexes(stageSourcesIndexes);

        transformSourceHolders();

        swipingProps.isAfterSwipeAnimationRunning = true;
        isSwipingSlidesState.set(false);
        swipingProps.swipedDifference = 0;

        setTimeout(() => {
            transitioner.removeAllTransitionsFromStageSources();
            swipingProps.isAfterSwipeAnimationRunning = false;
        }, FADE_IN_ANIMATION_TIME);
    };
}
