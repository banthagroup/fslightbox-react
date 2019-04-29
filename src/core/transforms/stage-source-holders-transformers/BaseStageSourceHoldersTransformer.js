/**
 * @class BaseStageSourceHoldersTransformer
 * @param { FsLightbox.core.stage.getAllStageIndexes | function(): { previous: number, current: number, next: number} } getAllStageIndexes
 * @param { isStageSourceHolderAtIndexValidForTransform
 * | function(): boolean } isStageSourceHolderAtIndexValidForTransform
 */
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