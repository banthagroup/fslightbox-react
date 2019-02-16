export class SourceHoldersTransformer {
    /**
     * @param _ {FsLightbox}
     */
    constructor(_) {
        this._ = _;
        this.i = null;
        this.source = null;
    }

    init() {
        // we need to use typeof !== "undefined" because index can be 0
        const stageSourcesIndexes = this._.stageSources.getAllStageIndexes();
        if (typeof stageSourcesIndexes.previous !== "undefined")
            this.transformNegative(stageSourcesIndexes.previous);

        this.transformZero(stageSourcesIndexes.current);

        if (typeof stageSourcesIndexes.next !== "undefined")
            this.transformPositive(stageSourcesIndexes.next);
    }

    transformNegative(i) {
        this._.elements.sourceHolders[i].current.style.transform = 'translate(' + -this._.slideDistance * window.innerWidth + 'px,0)';
    }

    transformZero(i) {
        this._.elements.sourceHolders[i].current.style.transform = 'translate(0,0)';
    }

    transformPositive(i) {
        this._.elements.sourceHolders[i].current.style.transform = 'translate(' + this._.slideDistance * window.innerWidth + 'px,0)';
    }
}