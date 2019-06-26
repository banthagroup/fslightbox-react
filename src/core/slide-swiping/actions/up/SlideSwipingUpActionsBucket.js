import { SOURCES_HOLDERS } from "../../../../constants/elements";
import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../../../constants/classes-names";

/**
 * @constructor
 */
export function SlideSwipingUpActionsBucket(
    {
        collections: {
            sourcesHoldersTransformers
        },
        core: {
            classListManager,
            slideIndexChanger
        },
        stageIndexes
    }
) {
    this.changeSlideToPrevious = () => {
        addTransitionToCurrentSourceHolderAndTransformItToPosition('positive');
        slideIndexChanger.changeTo(stageIndexes.previous);
        addTransitionToCurrentSourceHolderAndTransformItToPosition('zero');
    };

    this.changeSlideToNext = () => {
        addTransitionToCurrentSourceHolderAndTransformItToPosition('negative');
        slideIndexChanger.changeTo(stageIndexes.next);
        addTransitionToCurrentSourceHolderAndTransformItToPosition('zero');
    };

    this.addTransitionAndTransformZeroCurrentSlideSource = () => {
        addTransitionToCurrentSourceHolderAndTransformItToPosition('zero');
    };

    const addTransitionToCurrentSourceHolderAndTransformItToPosition = (position) => {
        classListManager
            .manageArrayElementAtIndex(SOURCES_HOLDERS, stageIndexes.current)
            .add(TRANSFORM_TRANSITION_CLASS_NAME);
        sourcesHoldersTransformers[stageIndexes.current][position]();
    };
}
