import { FADE_IN_ANIMATION_TIME } from "../../../../constants/CssConstants";

/**
 * @class
 * @param { FsLightbox.data } data
 * @param { FsLightbox.getters.getSlide | function(): number } getSlide,
 * @param { FsLightbox.setters.setState | Function } setState,
 * @param { FsLightbox.core.sourceHoldersTransformer.transformStageSourceHolderAtIndex
 * | function(number): SourceHolderTransformer } transformStageSourceHolderAtIndex
 * @param { FsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders
 * | function(number): StageSourceHoldersTransformer } transformStageSourceHolders
 * @param { FsLightbox.injector.slideSwiping.getSwipingTransitioner
 * | function(): SwipingTransitioner } getSwipingTransitioner
 * @param { FsLightbox.injector.slideSwiping.getSwipingSlideChangerForSwipingTransitioner
 * | function(): SwipingSlideChanger } getSwipingSlideChangerForSwipingTransitioner
 * @param { {downClientX, isAfterSwipeAnimationRunning, swipedDifference, isSourceDownEventTarget} } swipingProps
 */
export function SlideSwipingUpActions(
    {
        data,
        getters: {
            getSlide
        },
        setters: {
            setState
        },
        core: {
            stageSources: {
                getAllStageIndexes
            },
            sourceHoldersTransformer: {
                transformStageSourceHolderAtIndex,
                transformStageSourceHolders
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
        return getSlide() === 1;
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
        setState({
            isSwipingSlides: false
        });
        swipingProps.swipedDifference = 0;

        setTimeout(() => {
            transitioner.removeAllTransitionsFromStageSources();
            swipingProps.isAfterSwipeAnimationRunning = false;
        }, FADE_IN_ANIMATION_TIME);
    };
}
