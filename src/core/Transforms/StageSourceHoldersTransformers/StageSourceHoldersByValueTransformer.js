import { BaseStageSourceHoldersTransformer } from "./BaseStageSourceHoldersTransformer";

/**
 * @class
 * @extends BaseStageSourceHoldersTransformer
 * @param { FsLightbox } fsLightbox
 */
export function StageSourceHoldersByValueTransformer(fsLightbox) {
    const {
        core: {
            sourceHoldersTransformer: {
                /** @type { function(number): SourceHolderTransformer } */
                transformStageSourceHolderAtIndex
            },
        },
    } = fsLightbox;

    BaseStageSourceHoldersTransformer.call(this, fsLightbox);
    let transformValue;

    this.transformByValue = (value) => {
        transformValue = value;
        transformStageSourceHolderAtIndex(this.stageSourcesIndexes.current).byValue(value).zero();
        transformPreviousSourceHolderIfIsSet();
        transformNextSourceHolderIfIsSet();
    };

    const transformPreviousSourceHolderIfIsSet = () => {
        if (this.isPreviousSourceHolderSet()) {
            transformStageSourceHolderAtIndex(this.stageSourcesIndexes.previous).byValue(transformValue).negative();
        }
    };

    const transformNextSourceHolderIfIsSet = () => {
        if (this.isNextSourceHolderSet()) {
            transformStageSourceHolderAtIndex(this.stageSourcesIndexes.next).byValue(transformValue).positive();
        }
    };

}

StageSourceHoldersByValueTransformer.prototype = Object.create(BaseStageSourceHoldersTransformer.prototype);
StageSourceHoldersByValueTransformer.prototype.constructor = StageSourceHoldersByValueTransformer;

