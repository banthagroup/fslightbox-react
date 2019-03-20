/**
 * @class StageSourceHoldersTransformer
 * @param { FsLightbox.core.sourceHoldersTransformer | SourceHoldersTransformer } sourceHoldersTransformer
 * @param { FsLightbox.core.stageSources | StageSources } stageSources
 * @param { FsLightbox.getters.getSlide | Function }
 */
export function StageSourceHoldersTransformer(
    {
        core: { sourceHoldersTransformer, stageSources },
        getters: { getSlide }
    }
) {
    const stageSourcesIndexes = stageSources.getAllStageIndexes();

    // current source must exist always
    sourceHoldersTransformer.transformZero(stageSourcesIndexes.current);

    this.withoutTimeout = () => {
        transformNegative();
        transformPositive();
    };

    this.withTimeout = () => {
        setTimeout(() => {
            transformNegative();
            transformPositive();
        }, 220);
    };

    const transformNegative = () => {
        if (typeof stageSourcesIndexes.previous !== "undefined" && stageSourcesIndexes.previous !== getSlide() - 1) {
            sourceHoldersTransformer.transformNegative(stageSourcesIndexes.previous);
        }
    };

    const transformPositive = () => {
        if (typeof stageSourcesIndexes.next !== "undefined" && stageSourcesIndexes.next !== getSlide() - 1) {
            sourceHoldersTransformer.transformPositive(stageSourcesIndexes.next);
        }
    };
}