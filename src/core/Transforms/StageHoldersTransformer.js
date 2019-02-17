export class StageHoldersTransformer {
    constructor(_) {
        this._ = _;
        this.stageSourcesIndexes = _.stageSources.getAllStageIndexes();

        // current source must exist always
        this._.sourceHoldersTransformer
            .transformZero(this.stageSourcesIndexes.current);
    }

    withoutTimeout() {
        this.transformNegative();
        this.transformPositive();
    }

    withTimeout() {
        this._.isChangingSlide = true;
        setTimeout(() => {
            this._.isChangingSlide = false;
            this.transformNegative();
            this.transformPositive();
        }, 220);
    }

    transformNegative() {
        if (typeof this.stageSourcesIndexes.previous !== "undefined" && this.stageSourcesIndexes.previous !== this._.slide - 1) {
            this._.sourceHoldersTransformer.transformNegative(this.stageSourcesIndexes.previous);
        }
    }

    transformPositive() {
        if (typeof this.stageSourcesIndexes.next !== "undefined" && this.stageSourcesIndexes.next !== this._.slide - 1) {
            this._.sourceHoldersTransformer.transformPositive(this.stageSourcesIndexes.next);
        }
    }
}