import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../constants/CssConstants";

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
            let sourceHolderClassList = getSourceHolderClassListByIndex(stageSourcesIndexes[index]);
            if (sourceHolderClassList.contains(TRANSFORM_TRANSITION_CLASS_NAME)) {
                sourceHolderClassList.remove(TRANSFORM_TRANSITION_CLASS_NAME);
            }
        }
    };

    const addTransitionToSourceHolderByIndex = (sourceHolderIndex) => {
        getSourceHolderClassListByIndex(sourceHolderIndex).add(TRANSFORM_TRANSITION_CLASS_NAME);
    };

    /** @return { DOMTokenList } */
    const getSourceHolderClassListByIndex = (sourceHolderIndex) => {
        return sourceHolders[sourceHolderIndex].current.classList;
    };
}