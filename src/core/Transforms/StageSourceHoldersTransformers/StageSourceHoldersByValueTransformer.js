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
    let transformPreviousSourceHolder;
    let transformNextSourceHolder;

    this.transformByValue = (value) => {
        transformValue = value;
        transformStageSourceHolderAtIndex(this.stageSourcesIndexes.current).byValue(value).zero();
        transformPreviousSourceHolder();
        transformNextSourceHolder();
    };

    (this.isNextSourceHolderSet()) ?
        transformNextSourceHolder = () => {
            transformStageSourceHolderAtIndex(this.stageSourcesIndexes.next).byValue(transformValue).positive();
        } :
        transformNextSourceHolder = () => {
        };

    (this.isPreviousSourceHolderSet()) ?
        transformPreviousSourceHolder = () => {
            transformStageSourceHolderAtIndex(this.stageSourcesIndexes.previous).byValue(transformValue).negative();
        } :
        transformPreviousSourceHolder = () => {
        };
}

StageSourceHoldersByValueTransformer.prototype = Object.create(BaseStageSourceHoldersTransformer.prototype);
StageSourceHoldersByValueTransformer.prototype.constructor = StageSourceHoldersByValueTransformer;

