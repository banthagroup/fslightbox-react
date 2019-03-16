import { CURRENT_POSITION, NEXT_POSITION, PREVIOUS_POSITION } from "../../constants/CoreConstants";

export class StageSources {
    /** @param fsLightbox { FsLightbox }*/
    constructor(fsLightbox) {
        this.fsLightbox = fsLightbox;
    }

    isSourceInStage(index) {
        // slide is numbered from 1, so we need to increment array index
        index++;

        if (this.fsLightbox.state.slide === 1 && index === this.fsLightbox.totalSlides)
            return true;

        if (this.fsLightbox.state.slide === this.fsLightbox.totalSlides && index === 1)
            return true;

        const difference = this.fsLightbox.state.slide - index;
        return difference === PREVIOUS_POSITION ||
            difference === CURRENT_POSITION ||
            difference === NEXT_POSITION;
    }


    getPreviousSlideIndex() {
        let previousSlideIndex;
        (this.fsLightbox.state.slide === 1) ?
            previousSlideIndex = this.fsLightbox.totalSlides - 1 :
            previousSlideIndex = this.fsLightbox.state.slide - 2;

        return previousSlideIndex;
    }

    getNextSlideIndex() {
        let nextSlideIndex;
        (this.fsLightbox.state.slide === this.fsLightbox.totalSlides) ?
            nextSlideIndex = 0 :
            nextSlideIndex = this.fsLightbox.state.slide;

        return nextSlideIndex;
    }

    getAllStageIndexes() {
        const stageSourcesIndexes = {
            current: this.fsLightbox.state.slide - 1
        };
        if (this.fsLightbox.totalSlides > 1) {
            stageSourcesIndexes['next'] = this.getNextSlideIndex();
        }
        if (this.fsLightbox.totalSlides > 2) {
            stageSourcesIndexes['previous'] = this.getPreviousSlideIndex();
        }
        return stageSourcesIndexes;
    }
}