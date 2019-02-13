export class SourceSizeAdjusterIterator {
    constructor(fsLightbox) {
        this.fsLightbox = fsLightbox;
        this.index = 0;
    }

    hasNext() {
        return this.index < this.fsLightbox.sourceSizeAdjusters.length;
    }

    isNull() {
        return !this.fsLightbox.sourceSizeAdjusters[this.index];
    }

    adjustSourceSize() {
        if (!this.isNull())
            this.fsLightbox.sourceSizeAdjusters[this.index].adjustSourceSize();
    }

    adjustAllSourcesSizes() {
        this.index = 0;
        while (this.hasNext()) {
            this.adjustSourceSize();
            this.index++;
        }
    }
}