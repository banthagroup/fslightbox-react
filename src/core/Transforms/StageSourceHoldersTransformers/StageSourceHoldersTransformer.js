import { BaseStageSourceHoldersTransformer } from "./BaseStageSourceHoldersTransformer";

/**
 * @class
 * @extends BaseStageSourceHoldersTransformer
 * @param { FsLightbox } fsLightbox
 */
export function StageSourceHoldersTransformer(fsLightbox) {
    const {
        core: {
            sourceHoldersTransformer: {
                /** @type { function(number): SourceHolderTransformer } */
                transformStageSourceHolderAtIndex
            },
        },
    } = fsLightbox;

    BaseStageSourceHoldersTransformer.call(this, fsLightbox);

    // current source must exist always
    transformStageSourceHolderAtIndex(this.stageSourcesIndexes.current).zero();

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
        if (this.isPreviousSourceHolderSet()) {
            transformStageSourceHolderAtIndex(this.stageSourcesIndexes.previous).negative();
        }
    };

    const transformPositive = () => {
        if (this.isNextSourceHolderSet()) {
            transformStageSourceHolderAtIndex(this.stageSourcesIndexes.next).positive();
        }
    };
}

StageSourceHoldersTransformer.prototype = Object.create(BaseStageSourceHoldersTransformer.prototype);
StageSourceHoldersTransformer.prototype.constructor = StageSourceHoldersTransformer;