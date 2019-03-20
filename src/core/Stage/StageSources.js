import { CURRENT_POSITION, NEXT_POSITION, PREVIOUS_POSITION } from "../../constants/CoreConstants";

/**
 * @param { FsLightbox } fsLightbox
 * @param { FsLightbox.data } data
 * @param { FsLightbox.getters.getSlide | Function } getSlide
 * @class
 */
export function StageSources({ getters: { getSlide }, data }) {
    this.isSourceInStage = (index) => {
        // getSlide is numbered from 1, so we need to increment array index
        index++;
        if (getSlide() === 1 && index === data.totalSlides)
            return true;

        if (getSlide() === data.totalSlides && index === 1)
            return true;

        const difference = getSlide() - index;
        return difference === PREVIOUS_POSITION ||
            difference === CURRENT_POSITION ||
            difference === NEXT_POSITION;
    };


    this.getPreviousSlideIndex = () => {
        let previousSlideIndex;
        (getSlide() === 1) ?
            previousSlideIndex = data.totalSlides - 1 :
            previousSlideIndex = getSlide() - 2;

        return previousSlideIndex;
    };

    this.getNextSlideIndex = () => {
        let nextSlideIndex;
        (getSlide() === data.totalSlides) ?
            nextSlideIndex = 0 :
            nextSlideIndex = getSlide();

        return nextSlideIndex;
    };

    this.getAllStageIndexes = () => {
        const stageSourcesIndexes = {
            current: getSlide() - 1
        };
        if (data.totalSlides > 1) {
            stageSourcesIndexes['next'] = this.getNextSlideIndex();
        }
        if (data.totalSlides > 2) {
            stageSourcesIndexes['previous'] = this.getPreviousSlideIndex();
        }
        return stageSourcesIndexes;
    };
}