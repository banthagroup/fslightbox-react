/**
 * @constructor
 */
export function SwipingSlideChanger(
    {
        stageIndexes,
        collections: {
            sourcesHoldersTransformers
        },
        core: {
            stageManager,
            slideIndexChanger
        }
    }, {
        addTransitionToCurrentAndPrevious,
        addTransitionToCurrentAndNext,
    },
) {
    this.changeSlideToPrevious = () => {
        addTransitionToCurrentAndPrevious();
        sourcesHoldersTransformers[stageIndexes.current].positive();
        slideIndexChanger.changeTo(stageIndexes.previous);
        sourcesHoldersTransformers[stageIndexes.current].zero();
    };

    this.changeSlideToNext = () => {
        addTransitionToCurrentAndNext();
        sourcesHoldersTransformers[stageIndexes.current].negative();
        slideIndexChanger.changeTo(stageIndexes.next);
        sourcesHoldersTransformers[stageIndexes.current].zero();
    };
}
