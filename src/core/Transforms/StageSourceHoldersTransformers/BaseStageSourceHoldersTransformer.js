/**
 * @class BaseStageSourceHoldersTransformer
 * @param { FsLightbox.core.stageSources | StageSources } stageSources
 * @param { FsLightbox.core.sourceHoldersTransformer.isStageSourceHolderAtIndexSet
 * | function(): boolean } isStageSourceHolderAtIndexSet
 */
export function BaseStageSourceHoldersTransformer(
    {
        core: {
            stageSources,
            sourceHoldersTransformer: { isStageSourceHolderAtIndexSet },
        }
    }
) {
    this.stageSourcesIndexes = stageSources.getAllStageIndexes();

    this.isPreviousSourceHolderSet = () => {
        return isStageSourceHolderAtIndexSet(this.stageSourcesIndexes.previous);
    };

    this.isNextSourceHolderSet = () => {
        return isStageSourceHolderAtIndexSet(this.stageSourcesIndexes.next);
    };
}