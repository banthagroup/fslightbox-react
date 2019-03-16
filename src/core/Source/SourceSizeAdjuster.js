export class SourceSizeAdjuster {
    /**
     * @param fsLightbox {FsLightbox}
     */
    constructor(fsLightbox) {
        this.fsLightbox = fsLightbox;
        this._i = null;
        this._sourceWidth = 0;
        this._sourceHeight = 0;
        this._ratio = 0;
        this._newHeight = 0;
    }

    setIndex(index) {
        this._i = index;
        this._sourceWidth = this.fsLightbox.sourceDimensions[index].width;
        this._sourceHeight = this.fsLightbox.sourceDimensions[index].height;
        this._ratio = this._sourceWidth / this._sourceHeight;
    }

    adjustSourceSize() {
        this._newHeight = this.fsLightbox.maxSourceWidth / this._ratio;

        // wider than higher
        if (this._newHeight < this.fsLightbox.maxSourceHeight) {
            if (this._sourceWidth < this.fsLightbox.maxSourceWidth) {
                this._newHeight = this._sourceHeight;
            }
            this._setDimensions();
            return;
        }

        // higher than wider
        if (this._sourceHeight > this.fsLightbox.maxSourceHeight) {
            this._newHeight = this.fsLightbox.maxSourceHeight;
        } else {
            this._newHeight = this._sourceHeight;
        }

        this._setDimensions();
    }

    _setDimensions() {
        this.fsLightbox.elements.sources[this._i].current.style.height = this._newHeight + "px";
        this.fsLightbox.elements.sources[this._i].current.style.width = (this._newHeight * this._ratio) + "px";
    }
}