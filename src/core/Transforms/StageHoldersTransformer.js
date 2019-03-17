export class StageHoldersTransformer {
    /** @param fsLigthbox { FsLightbox } */
    constructor(fsLigthbox) {
        this.fsLigthbox = fsLigthbox;
        this.stageSourcesIndexes = fsLigthbox.core.stageSources.getAllStageIndexes();

        // current source must exist always
        this.fsLigthbox.core.sourceHoldersTransformer.transformZero(this.stageSourcesIndexes.current);
    }

    withoutTimeout() {
        this.transformNegative();
        this.transformPositive();
    }

    withTimeout() {
        setTimeout(() => {
            this.transformNegative();
            this.transformPositive();
        }, 220);
    }

    transformNegative() {
        if (typeof this.stageSourcesIndexes.previous !== "undefined" && this.stageSourcesIndexes.previous !== this.fsLigthbox.state.slide - 1) {
            this.fsLigthbox.core.sourceHoldersTransformer.transformNegative(this.stageSourcesIndexes.previous);
        }
    }

    transformPositive() {
        if (typeof this.stageSourcesIndexes.next !== "undefined" && this.stageSourcesIndexes.next !== this.fsLigthbox.state.slide - 1) {
            this.fsLigthbox.core.sourceHoldersTransformer.transformPositive(this.stageSourcesIndexes.next);
        }
    }
}