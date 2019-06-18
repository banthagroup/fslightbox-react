import { CURRENT_POSITION, NEXT_POSITION, PREVIOUS_POSITION } from "../../constants/coreConstants";

export function setUpStageManager(
    {
        stageIndexes,
        core: { stageManager: self },
        data: { lastSourceIndex },
    }
) {
    setUpUpdateStageIndexes();
    setUpIsSourceInStage();

    // TODO: can make those getIndex methods to be not assigned when there is only one slid
    self.getPreviousSlideIndex = () => {
        return (stageIndexes.current === 0) ?
            lastSourceIndex :
            stageIndexes.current - 1;
    };

    self.getPreviousSlideNumber = () => {
        return self.getPreviousSlideIndex() + 1;
    };

    self.getNextSlideIndex = () => {
        return (stageIndexes.current === lastSourceIndex) ?
            0 :
            stageIndexes.current + 1;
    };

    self.getNextSlideNumber = () => {
        return self.getNextSlideIndex() + 1;
    };

    function setUpUpdateStageIndexes() {
        if (lastSourceIndex === 0) {
            self.updateStageIndexes = () => {};
            return;
        }
        if (lastSourceIndex === 1) {
            self.updateStageIndexes = () => {
                if (stageIndexes.current === 0) {
                    stageIndexes.next = 1;
                    delete stageIndexes.previous;
                } else {
                    stageIndexes.previous = 0;
                    delete stageIndexes.next;
                }
            };
            return;
        }
        self.updateStageIndexes = () => {
            stageIndexes.previous = self.getPreviousSlideIndex();
            stageIndexes.next = self.getNextSlideIndex();
        };
    }

    function setUpIsSourceInStage() {
        // if there are 3, 2, 1 slides all sources will be always in stage
        if(lastSourceIndex <= 2) {
            self.isSourceInStage = () => true;
            return;
        }
        self.isSourceInStage = (index) => {
            const currentIndex = stageIndexes.current;

            if ((currentIndex === 0 && index === lastSourceIndex)
                || (currentIndex === lastSourceIndex && index === 0))
                return true;

            const difference = currentIndex - index;
            return difference === PREVIOUS_POSITION ||
                difference === CURRENT_POSITION ||
                difference === NEXT_POSITION;
        };
    }
}
