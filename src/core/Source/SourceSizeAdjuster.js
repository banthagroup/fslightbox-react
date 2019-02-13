export class SourceSizeAdjuster {
    constructor(fsLightbox) {
        this.fsLightbox = fsLightbox;
        this.element = null;
        this.index = null;
        this.sourceWidth = 0;
        this.sourceHeight = 0;
        this.ratio = 0;
        this.newHeight = 0;
    }

    setIndex(index) {
        this.index = index;
        this.sourceWidth = this.fsLightbox.sourceDimensions[index].width;
        this.sourceHeight = this.fsLightbox.sourceDimensions[index].height;
        this.ratio = this.sourceWidth / this.sourceHeight;
    }

    updateSource() {
        this.element = this.fsLightbox.elements.sources[this.index].current;
    }

    adjustSourceSize() {
        this.newHeight = this.fsLightbox.maxSourceWidth / this.ratio;

        // wider than higher
        if (this.newHeight < this.fsLightbox.maxSourceHeight) {
            if (this.sourceWidth < this.fsLightbox.maxSourceWidth) {
                this.newHeight = this.sourceHeight;
            }
            this.setDimensions();
            return;
        }

        // higher than wider
        if (this.sourceHeight > this.fsLightbox.maxSourceHeight) {
            this.newHeight = this.fsLightbox.maxSourceHeight;
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