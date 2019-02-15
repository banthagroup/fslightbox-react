export default class SourceSizeAdjusterIterator {
    constructor(_) {
        this._ = _;
        this.i = 0;
    }

    hasNext() {
        return this.i < this._.sourceSizeAdjusters.length;
    }

    isNull() {
        return !this._.sourceSizeAdjusters[this.i];
    }

    adjustSourceSize() {
        if (!this.isNull())
            this._.sourceSizeAdjusters[this.i].adjustSourceSize();
    }

    adjustAllSourcesSizes() {
        this.i = 0;
        while (this.hasNext()) {
            this.adjustSourceSize();
            this.i++;
        }
    }
}