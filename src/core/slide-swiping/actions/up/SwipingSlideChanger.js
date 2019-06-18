/**
 * @constructor
 */
export function SwipingSlideChanger(
    {
        stageIndexes,
        componentsStates: {
            slide: slideState
        },
        core: {
            sourcesHoldersTransformer
        }
    }, {
        addTransitionToCurrentAndPrevious,
        addTransitionToCurrentAndNext,
    },
) {
    this.changeSlideToPrevious = () => {
        callTransformsAndSetSlideTo(stageIndexes.previous + 1);
        addTransitionToCurrentAndPrevious();
    };

    this.changeSlideToNext = () => {
        callTransformsAndSetSlideTo(stageIndexes.next + 1);
        addTransitionToCurrentAndNext();
    };

    const callTransformsAndSetSlideTo = (slide) => {
        stageIndexes.current = slide - 1;
        sourcesHoldersTransformer.transform().withoutTimeout();
    };
}
