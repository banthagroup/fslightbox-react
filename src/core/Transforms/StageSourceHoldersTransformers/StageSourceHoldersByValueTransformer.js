import { BaseStageSourceHoldersTransformer } from "./BaseStageSourceHoldersTransformer";

/**
 * @class
 * @extends BaseStageSourceHoldersTransformer
 * @param { FsLightbox } fsLightbox
 */
export function StageSourceHoldersByValueTransformer(fsLightbox) {
    BaseStageSourceHoldersTransformer.call(this, fsLightbox);

    this.transformByValue = (value) => {
        console.log(fsLightbox);
        return "don't work";
    };
}

StageSourceHoldersByValueTransformer.prototype = Object.create(BaseStageSourceHoldersTransformer.prototype);
StageSourceHoldersByValueTransformer.prototype.constructor = StageSourceHoldersByValueTransformer;

