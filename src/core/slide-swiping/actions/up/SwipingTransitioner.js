import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../../../constants/css-constants";
import { getClassListOfElementInArrayByIndex } from "../../../../helpers/source/getClassListOfElementInArrayByIndex";

/**
 * @constructor
 */
export function SwipingTransitioner(
    {
        stageIndexes,
        elements: { sourceHolders },
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

    this.removeAllTransitionsFromStageSources = () => {
        for (let index in stageIndexes) {
            let sourceHolderClassList = getClassListOfElementInArrayByIndex(sourceHolders, stageIndexes[index]);
            if (sourceHolderClassList.contains(TRANSFORM_TRANSITION_CLASS_NAME)) {
                sourceHolderClassList.remove(TRANSFORM_TRANSITION_CLASS_NAME);
            }
        }
    };

    const addTransitionToSourceHolderByIndex = (sourceHolderIndex) => {
        getClassListOfElementInArrayByIndex(sourceHolders, sourceHolderIndex).add(TRANSFORM_TRANSITION_CLASS_NAME);
    };
}
