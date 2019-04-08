import { BaseStageSourceHoldersTransformer } from "./BaseStageSourceHoldersTransformer";
import { FADE_IN_ANIMATION_TIME } from "../../../constants/CssConstants";

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
        // transforming for less than animation time to avoid flashing
        setTimeout(() => {
            transformNegative();
            transformPositive();
        }, FADE_IN_ANIMATION_TIME - 30);
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