/**
 * @class
 * @param { FsLightbox.setters.setState | Function } setState
 * @param { FsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders
 * | function(): StageSourceHoldersTransformer } transformStageSourceHolders
 * @param { SwipingTransitioner.addTransitionToCurrentAndPrevious | Function } addTransitionToCurrentAndPrevious
 * @param { SwipingTransitioner.addTransitionToCurrentAndNext | Function } addTransitionToCurrentAndNext
 */
export function SwipingSlideChanger(
    {
        setters: {
            setState
        },
        core: {
            sourceHoldersTransformer: { transformStageSourceHolders },
        },
    }, {
        addTransitionToCurrentAndPrevious,
        addTransitionToCurrentAndNext,
    },
) {
    /** @var {{previous: number | undefined , current: number, next: number | undefined}} stageSourcesIndexes */
    let stageSourcesIndexes;

    this.setStageSourcesIndexes = (indexes) => {
        stageSourcesIndexes = indexes;
    };

    this.changeSlideToPrevious = () => {
        callTransformsAndSetSlideTo(stageSourcesIndexes.previous + 1);
        addTransitionToCurrentAndPrevious();
    };

    this.changeSlideToNext = () => {
        callTransformsAndSetSlideTo(stageSourcesIndexes.next + 1);
        addTransitionToCurrentAndNext();
    };

    const callTransformsAndSetSlideTo = (slide) => {
        setState({
            slide: slide
        }, () => {
            transformStageSourceHolders().withoutTimeout();
        });
    };
}