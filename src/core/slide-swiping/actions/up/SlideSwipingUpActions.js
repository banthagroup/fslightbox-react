import { CURSOR_GRABBING_CLASS_NAME, TRANSFORM_TRANSITION_CLASS_NAME } from "../../../../constants/classes-names";
import { ANIMATION_TIME } from "../../../../constants/css-constants";
import { LIGHTBOX_CONTAINER, SOURCES_HOLDERS } from "../../../../constants/elements";
import { SlideSwipingUpActionsBucket } from "./SlideSwipingUpActionsBucket";

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
            resolve
        },
        stageIndexes
    }, swipingProps
) {
    const {
        changeSlideToPrevious,
        changeSlideToNext,
        addTransitionAndTransformZeroCurrentSlideSource
    } = resolve(SlideSwipingUpActionsBucket);

    this.resetSwiping = () => {
        hasMovedWhileSwipingState.set(false);
        data.isSwipingSlides = false;
        // if user just 'clicked' not swiped to lightbox won't be added cursor grabbing class
        // so we need to check if it contains
        classListManager
            .manageElement(LIGHTBOX_CONTAINER)
            .removeIfContains(CURSOR_GRABBING_CLASS_NAME);
    };

    this.runActions = () => {
        if (swipingProps.swipedDifference > 0) {
            (stageIndexes.previous === undefined) ?
                addTransitionAndTransformZeroCurrentSlideSource() :
                changeSlideToPrevious();
        } else {
            (stageIndexes.next === undefined) ?
                addTransitionAndTransformZeroCurrentSlideSource() :
                changeSlideToNext();
        }

        swipingProps.isAfterSwipeAnimationRunning = true;
        swipingProps.swipedDifference = 0;

        setTimeout(() => {
            // we are removing all transition classes from all sources
            // because client may change slide during swipe animation with e.g. keyboard keys
            for (let i = 0; i < data.sourcesCount; i++) {
                classListManager
                    .manageArrayElementAtIndex(SOURCES_HOLDERS, i)
                    .removeIfContains(TRANSFORM_TRANSITION_CLASS_NAME);
            }

            swipingProps.isAfterSwipeAnimationRunning = false;
        }, ANIMATION_TIME);
    };
}
