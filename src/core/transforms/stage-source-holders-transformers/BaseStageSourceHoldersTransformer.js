/** @constructor */
export function BaseStageSourceHoldersTransformer(
    {
        core: {
            stage: { getAllStageIndexes },
            sourceHoldersTransformer: { isStageSourceHolderAtIndexValidForTransform },
        }
    }
) {
    this.stageSourcesIndexes = getAllStageIndexes();

    this.isPreviousSourceHolderSet = () => {
        return isStageSourceHolderAtIndexValidForTransform(this.stageSourcesIndexes.previous);
    };

    this.isNextSourceHolderSet = () => {
        return isStageSourceHolderAtIndexValidForTransform(this.stageSourcesIndexes.next);
    };
}