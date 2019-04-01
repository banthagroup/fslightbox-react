/**
 * @class BaseStageSourceHoldersTransformer
 * @param { FsLightbox.core.stageSources | StageSources } stageSources
 * @param { FsLightbox.core.sourceHoldersTransformer.isStageSourceHolderAtIndexValidForTransform
 * | function(): boolean } isStageSourceHolderAtIndexValidForTransform
 */
export function BaseStageSourceHoldersTransformer(
    {
        core: {
            stageSources,
            sourceHoldersTransformer: { isStageSourceHolderAtIndexValidForTransform },
        }
    }
) {
    this.stageSourcesIndexes = stageSources.getAllStageIndexes();

    this.isPreviousSourceHolderSet = () => {
        return isStageSourceHolderAtIndexValidForTransform(this.stageSourcesIndexes.previous);
    };

    this.isNextSourceHolderSet = () => {
        return isStageSourceHolderAtIndexValidForTransform(this.stageSourcesIndexes.next);
    };
}