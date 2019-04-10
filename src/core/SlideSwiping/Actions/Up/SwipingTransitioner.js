import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../../../constants/CssConstants";
import { getClassListOfElementInArrayByIndex } from "../../../../utils/Source/getClassListOfElementInArrayByIndex";

/**
 * @class
 * @param { FsLightbox.elements.sourceHolders | Array } sourceHolders
 */
export function SwipingTransitioner({ elements: { sourceHolders } }) {
    /** @var {{previous: number | undefined , current: number, next: number | undefined}} stageSourcesIndexes */
    let stageSourcesIndexes;

    this.setStageSourcesIndexes = (indexes) => {
        stageSourcesIndexes = indexes;
    };

    this.addTransitionToCurrentAndPrevious = () => {
        addTransitionToSourceHolderByIndex(stageSourcesIndexes.current);
        addTransitionToSourceHolderByIndex(stageSourcesIndexes.previous);
    };

    this.addTransitionToCurrentAndNext = () => {
        addTransitionToSourceHolderByIndex(stageSourcesIndexes.current);
        addTransitionToSourceHolderByIndex(stageSourcesIndexes.next);
    };

    this.addTransitionToCurrent = () => {
        addTransitionToSourceHolderByIndex(stageSourcesIndexes.current);
    };

    this.removeAllTransitionsFromStageSources = () => {
        for (let index in stageSourcesIndexes) {
            let sourceHolderClassList = getClassListOfElementInArrayByIndex(sourceHolders, stageSourcesIndexes[index]);
            if (sourceHolderClassList.contains(TRANSFORM_TRANSITION_CLASS_NAME)) {
                sourceHolderClassList.remove(TRANSFORM_TRANSITION_CLASS_NAME);
            }
        }
    };

    const addTransitionToSourceHolderByIndex = (sourceHolderIndex) => {
        getClassListOfElementInArrayByIndex(sourceHolders, sourceHolderIndex).add(TRANSFORM_TRANSITION_CLASS_NAME);
    };
}