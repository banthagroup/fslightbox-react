import { CURSOR_GRABBING_CLASS_NAME, TRANSFORM_TRANSITION_CLASS_NAME } from "../../../../constants/classes-names";
import { ANIMATION_TIME } from "../../../../constants/css-constants";
import { LIGHTBOX_CONTAINER, SOURCES_HOLDERS } from "../../../../constants/elements";
import { SlideSwipingUpActionsBucket } from "./SlideSwipingUpActionsBucket";

/**
 * @constructor
 */
export function SlideSwipingUpActions(
    {
        componentsStates: {
            hasMovedWhileSwiping: hasMovedWhileSwipingState,
        },
        core: {
            classListManager
        },
        data,
        injector: {
            injectDependency
        },
        stageIndexes
    }, swipingProps
) {
    const {
        changeSlideToPrevious,
        changeSlideToNext,
        addTransitionAndTransformZeroCurrentSlide
    } = injectDependency(SlideSwipingUpActionsBucket);

    this.resetSwiping = () => {
        hasMovedWhileSwipingState.set(false);
        data.isSwipingSlides = false;
        classListManager.ifElementHasClassRemoveIt(LIGHTBOX_CONTAINER, CURSOR_GRABBING_CLASS_NAME);
    };

    this.runActions = () => {
        if (swipingProps.swipedDifference > 0) {
            (stageIndexes.previous === undefined) ?
                addTransitionAndTransformZeroCurrentSlide() :
                changeSlideToPrevious();
        } else {
            (stageIndexes.next === undefined) ?
                addTransitionAndTransformZeroCurrentSlide() :
                changeSlideToNext();
        }

        swipingProps.isAfterSwipeAnimationRunning = true;
        swipingProps.swipedDifference = 0;

        setTimeout(() => {
            // we are removing all transition classes from all sources because client may change during swipe animation
            // with e.g. keyboard keys
            for (let i = 0; i < data.sourcesCount; i++) {
                classListManager.ifElementFromArrayAtIndexHasClassRemoveIt(
                    SOURCES_HOLDERS,
                    i,
                    TRANSFORM_TRANSITION_CLASS_NAME
                );
            }

            swipingProps.isAfterSwipeAnimationRunning = false;
        }, ANIMATION_TIME);
    };
}
