import { CURRENT_POSITION, NEXT_POSITION, PREVIOUS_POSITION } from "../../constants/coreConstants";

export function setUpStage(
    {
        componentsStates: {
            slide: slideState
        },
        data,
        core: {
            stage: self
        }
    }
) {
    self.isSourceInStage = (index) => {
        // getSlide is numbered from 1, so we need to increment array index
        index++;
        const slideStateValue = slideState.get();
        if (slideStateValue === 1 && index === data.totalSlides)
            return true;

        if (slideStateValue === data.totalSlides && index === 1)
            return true;

        const difference = slideStateValue - index;
        return difference === PREVIOUS_POSITION ||
            difference === CURRENT_POSITION ||
            difference === NEXT_POSITION;
    };


    self.getPreviousSlideIndex = () => {
        return retrievePreviousSlideIndex();
    };

    self.getPreviousSlideNumber = () => {
        return retrievePreviousSlideIndex() + 1;
    };

    const retrievePreviousSlideIndex = () => {
        let previousSlideIndex;
        (slideState.get() === 1) ?
            previousSlideIndex = data.totalSlides - 1 :
            previousSlideIndex = slideState.get() - 2;
        return previousSlideIndex;
    };

    self.getNextSlideIndex = () => {
        return retrieveNextSlideIndex();
    };

    self.getNextSlideNumber = () => {
        return retrieveNextSlideIndex() + 1;
    };

    const retrieveNextSlideIndex = () => {
        let nextSlideIndex;
        (slideState.get() === data.totalSlides) ?
            nextSlideIndex = 0 :
            nextSlideIndex = slideState.get();
        return nextSlideIndex;
    };

    /**
     * @return {{previous: number | undefined , current: number, next: number | undefined}}
     */
    self.getAllStageIndexes = () => {
        const stageSourcesIndexes = {
            current: slideState.get() - 1
        };
        if (data.totalSlides === 2) {
            if (slideState.get() === 2) {
                stageSourcesIndexes.previous = self.getPreviousSlideIndex();
            } else {
                stageSourcesIndexes.next = self.getNextSlideIndex();
            }
        }
        if (data.totalSlides > 2) {
            stageSourcesIndexes.previous = self.getPreviousSlideIndex();
            stageSourcesIndexes.next = self.getNextSlideIndex();
        }
        return stageSourcesIndexes;
    };
}