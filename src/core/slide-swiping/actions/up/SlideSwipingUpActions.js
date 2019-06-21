import { CURSOR_GRABBING_CLASS_NAME } from "../../../../constants/classes-names";
import { SwipingTransitioner } from "./SwipingTransitioner";
import { SwipingSlideChanger } from "./SwipingSlideChanger";
import { ANIMATION_TIME } from "../../../../constants/css-constants";
import { LIGHTBOX_CONTAINER } from "../../../../constants/elements";

/**
 * @constructor
 */
export function SlideSwipingUpActions(
    {
        data,
        collections: {
            sourcesHoldersTransformers
        },
        componentsStates: {
            hasMovedWhileSwiping: hasMovedWhileSwipingState,
        },
        core: {
            classListManager
        },
        injector: {
            injectDependency
        },
        stageIndexes
    }, swipingProps
) {
    const swipingTransitioner = injectDependency(SwipingTransitioner);
    const swipingSlideChanger = injectDependency(SwipingSlideChanger, [swipingTransitioner]);

    this.resetSwiping = () => {
        hasMovedWhileSwipingState.set(false);
        data.isSwipingSlides = false;
        classListManager.ifElementHasClassRemoveIt(LIGHTBOX_CONTAINER, CURSOR_GRABBING_CLASS_NAME);
    };

    this.runActions = () => {
        if (swipingProps.swipedDifference > 0) {
            (stageIndexes.previous !== undefined) ?
                swipingSlideChanger.changeSlideToPrevious() :
                addTransitionToCurrentAndTransformCurrentZero();
        } else {
            (stageIndexes.next !== undefined) ?
                swipingSlideChanger.changeSlideToNext() :
                addTransitionToCurrentAndTransformCurrentZero();
        }

        swipingProps.isAfterSwipeAnimationRunning = true;
        swipingProps.swipedDifference = 0;

        setTimeout(() => {
            swipingTransitioner.removeAllTransitions();
            swipingProps.isAfterSwipeAnimationRunning = false;
        }, ANIMATION_TIME);
    };

    const addTransitionToCurrentAndTransformCurrentZero = () => {
        swipingTransitioner.addTransitionToCurrent();
        sourcesHoldersTransformers[stageIndexes.current].zero();
    };
}
