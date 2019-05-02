import { CURSOR_GRABBING_CLASS_NAME, FADE_IN_ANIMATION_TIME } from "../../../../constants/cssConstants";
import { SwipingTransitioner } from "./SwipingTransitioner";
import { SwipingSlideChanger } from "./SwipingSlideChanger";
import { ifElementContainsClassRemoveIt } from "../../../../helpers/dom/classes/IfElementContainsClassRemoveIt";

/**
 * @constructor
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
            injectDependency
        },
        elements: {
            container
        }
    }, swipingProps
) {
    const transitioner = injectDependency(SwipingTransitioner);
    const slideChanger = injectDependency(SwipingSlideChanger, [transitioner]);
    let transformSourceHolders;
    let transformSourceHoldersBackward;
    let transformSourceHoldersForward;

    this.setUpTransformSourceHolders = () => {
        if (data.totalSlides === 1) {
            transformSourceHolders = () => {
                transitioner.addTransitionToCurrent();
                sourceHoldersTransformer.transformSourceHolderAtIndex(0).zero();
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
        ifElementContainsClassRemoveIt(container, CURSOR_GRABBING_CLASS_NAME);
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
