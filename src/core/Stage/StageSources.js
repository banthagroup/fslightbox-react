import { CURRENT_POSITION, NEXT_POSITION, PREVIOUS_POSITION } from "../../constants/CoreConstants";

export class StageSources {
    /**
     * @param _ { FsLightbox }
     */
    constructor(_) {
        this._ = _;
    }

    isSourceInStage(index) {
        // slide is numbered from 1, so we need to increment array index
        index++;

        if (this._.slide === 1 && index === this._.totalSlides)
            return true;

        if (this._.slide === this._.totalSlides && index === 1)
            return true;

        const difference = this._.slide - index;
        return difference === PREVIOUS_POSITION ||
            difference === CURRENT_POSITION ||
            difference === NEXT_POSITION;
    }


    getPreviousSlideIndex() {
        let previousSlideIndex;
        (this._.slide === 1) ?
            previousSlideIndex = this._.totalSlides - 1 :
            previousSlideIndex = this._.slide - 2;

        return previousSlideIndex;
    }

    getNextSlideIndex() {
        let nextSlideIndex;
        (this._.slide === this._.totalSlides) ?
            nextSlideIndex = 0 :
            nextSlideIndex = this._.slide;

        return nextSlideIndex;
    }

    getAllStageIndexes() {
        const stageSourcesIndexes = {
            current: this._.slide - 1
        };
        if (this._.totalSlides > 1) {
            stageSourcesIndexes['next'] = this.getNextSlideIndex();
        }
        if (this._.totalSlides > 2) {
            stageSourcesIndexes['previous'] = this.getPreviousSlideIndex();
        }
        return stageSourcesIndexes;
    }
}