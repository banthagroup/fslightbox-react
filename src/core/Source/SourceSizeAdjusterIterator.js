export default class SourceSizeAdjusterIterator {
    /** @param fsLightbox { FsLightbox } */
    constructor({ collections: collections }) {
        this.collections = collections;
        this._i = 0;
    }

    adjustAllSourcesSizes() {
        this._i = 0;
        while (this._hasNext()) {
            this._adjustSourceSize();
            this._i++;
        }
    }

    _hasNext() {
        return this._i < this.collections.sourceSizeAdjusters.length;
    }

    _adjustSourceSize() {
        if (!this._isNull())
            this.collections.sourceSizeAdjusters[this._i].adjustSourceSize();
    }

    _isNull() {
        return !this.collections.sourceSizeAdjusters[this._i];
    }
}