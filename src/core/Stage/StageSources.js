import { CURRENT_POSITION, NEXT_POSITION, PREVIOUS_POSITION } from "../../constants/CoreConstants";

/**
 * @class
 * @param { FsLightbox.data } data
 * @param { FsLightbox.componentsStates.slide | { get: function(): number, set: function(number)} } slideState
 */
export function StageSources({ componentsStates: { slide: slideState }, data }) {
    this.isSourceInStage = (index) => {
        // getSlide is numbered from 1, so we need to increment array index
        index++;
        if (slideState.get() === 1 && index === data.totalSlides)
            return true;

        if (slideState.get() === data.totalSlides && index === 1)
            return true;

        const difference = slideState.get() - index;
        return difference === PREVIOUS_POSITION ||
            difference === CURRENT_POSITION ||
            difference === NEXT_POSITION;
    };


    this.getPreviousSlideIndex = () => {
        let previousSlideIndex;
        (slideState.get() === 1) ?
            previousSlideIndex = data.totalSlides - 1 :
            previousSlideIndex = slideState.get() - 2;

        return previousSlideIndex;
    };

    this.getNextSlideIndex = () => {
        let nextSlideIndex;
        (slideState.get() === data.totalSlides) ?
            nextSlideIndex = 0 :
            nextSlideIndex = slideState.get();

        return nextSlideIndex;
    };

    /**
     * @return {{previous: number | undefined , current: number, next: number | undefined}}
     */
    this.getAllStageIndexes = () => {
        const stageSourcesIndexes = {
            current: slideState.get() - 1
        };
        if (data.totalSlides === 2) {
            if (slideState.get() === 2) {
                stageSourcesIndexes.previous = this.getPreviousSlideIndex();
            } else {
                stageSourcesIndexes.next = this.getNextSlideIndex();
            }
        }
        if (data.totalSlides > 2) {
            stageSourcesIndexes.previous = this.getPreviousSlideIndex();
            stageSourcesIndexes.next = this.getNextSlideIndex();
        }
        return stageSourcesIndexes;
    };
}