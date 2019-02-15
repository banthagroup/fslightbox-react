export class SourceSizeAdjuster {
    /**
     * @param _ {FsLightbox}
     */
    constructor(_) {
        this._ = _;
        this.element = null;
        this.i = null;
        this.sourceWidth = 0;
        this.sourceHeight = 0;
        this.ratio = 0;
        this.newHeight = 0;
    }

    setIndex(index) {
        this.i = index;
        this.sourceWidth = this._.sourceDimensions[index].width;
        this.sourceHeight = this._.sourceDimensions[index].height;
        this.ratio = this.sourceWidth / this.sourceHeight;
    }

    updateSource() {
        this.element = this._.elements.sources[this.i].current;
    }

    adjustSourceSize() {
        this.newHeight = this._.maxSourceWidth / this.ratio;

        // wider than higher
        if (this.newHeight < this._.maxSourceHeight) {
            if (this.sourceWidth < this._.maxSourceWidth) {
                this.newHeight = this.sourceHeight;
            }
            this.setDimensions();
            return;
        }

        // higher than wider
        if (this.sourceHeight > this._.maxSourceHeight) {
            this.newHeight = this._.maxSourceHeight;
        } else {
            this.newHeight = this.sourceHeight;
        }

        this.setDimensions();
    }

    setDimensions() {
        this.element.style.height = this.newHeight + "px";
        this.element.style.width = (this.newHeight * this.ratio) + "px";
    }
}