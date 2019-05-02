import { BaseStageSourceHoldersTransformer } from "./BaseStageSourceHoldersTransformer";

/**
 * @constructor
 * @extends BaseStageSourceHoldersTransformer
 */
export function StageSourceHoldersByValueTransformer(fsLightbox) {
    const {
        core: {
            sourceHoldersTransformer: {
                transformSourceHolderAtIndex
            },
        },
    } = fsLightbox;

    let transformValue;
    let transformPreviousSourceHolder;
    let transformNextSourceHolder;

    BaseStageSourceHoldersTransformer.call(this, fsLightbox);

    this.transformByValue = (value) => {
        transformValue = value;
        transformSourceHolderAtIndex(this.stageSourcesIndexes.current).byValue(transformValue).zero();
        transformPreviousSourceHolder();
        transformNextSourceHolder();
    };

    (this.isPreviousSourceHolderSet()) ?
        transformPreviousSourceHolder = () => {
            transformSourceHolderAtIndex(this.stageSourcesIndexes.previous).byValue(transformValue).negative();
        } : transformPreviousSourceHolder = () => {};

    (this.isNextSourceHolderSet()) ?
        transformNextSourceHolder = () => {
            transformSourceHolderAtIndex(this.stageSourcesIndexes.next).byValue(transformValue).positive();
        } : transformNextSourceHolder = () => {};
}

StageSourceHoldersByValueTransformer.prototype = Object.create(BaseStageSourceHoldersTransformer.prototype);
StageSourceHoldersByValueTransformer.prototype.constructor = StageSourceHoldersByValueTransformer;


