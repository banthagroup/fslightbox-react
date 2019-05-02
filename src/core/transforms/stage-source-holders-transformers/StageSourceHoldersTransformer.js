import { BaseStageSourceHoldersTransformer } from "./BaseStageSourceHoldersTransformer";
import { FADE_IN_ANIMATION_TIME } from "../../../constants/cssConstants";

/**
 * @constructor
 * @extends BaseStageSourceHoldersTransformer
 */
export function StageSourceHoldersTransformer(fsLightbox) {
    const {
        core: {
            sourceHoldersTransformer: {
                /** @type { function(number): SourceHolderTransformer } */
                transformSourceHolderAtIndex
            },
        },
    } = fsLightbox;

    BaseStageSourceHoldersTransformer.call(this, fsLightbox);

    // current source must exist always
    transformSourceHolderAtIndex(this.stageSourcesIndexes.current).zero();

    this.withoutTimeout = () => {
        transformNegative();
        transformPositive();
    };

    this.withTimeout = () => {
        setTimeout(() => {
            transformNegative();
            transformPositive();
        }, FADE_IN_ANIMATION_TIME - 30);
    };

    const transformNegative = () => {
        if (this.isPreviousSourceHolderSet()) {
            transformSourceHolderAtIndex(this.stageSourcesIndexes.previous).negative();
        }
    };

    const transformPositive = () => {
        if (this.isNextSourceHolderSet()) {
            transformSourceHolderAtIndex(this.stageSourcesIndexes.next).positive();
        }
    };
}

StageSourceHoldersTransformer.prototype = Object.create(BaseStageSourceHoldersTransformer.prototype);
StageSourceHoldersTransformer.prototype.constructor = StageSourceHoldersTransformer;