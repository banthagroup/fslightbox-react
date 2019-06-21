import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../../../constants/classes-names";
import { SOURCES_HOLDERS } from "../../../../constants/elements";

/**
 * @constructor
 */
export function SwipingTransitioner(
    {
        core: {
            classListManager
        },
        data: { sourcesCount },
        stageIndexes,
    }
) {
    this.addTransitionToCurrentAndPrevious = () => {
        addTransitionToSourceHolderByIndex(stageIndexes.current);
        addTransitionToSourceHolderByIndex(stageIndexes.previous);
    };

    this.addTransitionToCurrentAndNext = () => {
        addTransitionToSourceHolderByIndex(stageIndexes.current);
        addTransitionToSourceHolderByIndex(stageIndexes.next);
    };

    this.addTransitionToCurrent = () => {
        addTransitionToSourceHolderByIndex(stageIndexes.current);
    };

    this.removeAllTransitions = () => {
        for (let i = 0; i < sourcesCount; i++) {
            classListManager.ifElementFromArrayAtIndexHasClassRemoveIt(
                SOURCES_HOLDERS,
                i,
                TRANSFORM_TRANSITION_CLASS_NAME
            );
        }
    };

    const addTransitionToSourceHolderByIndex = (index) => {
        classListManager.addToElementInArrayAtIndexClass(
            SOURCES_HOLDERS,
            index,
            TRANSFORM_TRANSITION_CLASS_NAME
        );
    };
}
