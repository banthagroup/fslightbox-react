import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../constants/CssConstants";


// TODO: TEST AND REFACTOR
/**
 * @class
 * @param { FsLightbox } fsLightbox
 */
export function SwipingTransitioner(fsLightbox) {
    /** @var {{previous: number | undefined , current: number, next: number | undefined}} stageSourcesIndexes */
    let stageSourcesIndexes;

    this.setStageSourcesIndexes = (indexes) => {
        stageSourcesIndexes = indexes;
    };

    this.removeAll = () => {
        for (let index in stageSourcesIndexes) {
            if (fsLightbox.elements.sourceHolders[stageSourcesIndexes[index]])
                fsLightbox.elements.sourceHolders[stageSourcesIndexes[index]].current.classList.remove(TRANSFORM_TRANSITION_CLASS_NAME);
        }
    };

    this.addTransitionToCurrentAndNext = () => {
        this.addTransitionToCurrent();
        fsLightbox.elements.sourceHolders[stageSourcesIndexes.next].current.classList.add(TRANSFORM_TRANSITION_CLASS_NAME)
    };

    this.addTransitionToCurrentAndPrevious = () => {
        this.addTransitionToCurrent();
        fsLightbox.elements.sourceHolders[stageSourcesIndexes.previous].current.classList.add(TRANSFORM_TRANSITION_CLASS_NAME)
    };


    this.addTransitionToCurrent = () => {
        fsLightbox.elements.sourceHolders[stageSourcesIndexes.current].current.classList.add(TRANSFORM_TRANSITION_CLASS_NAME);
    };
}