export class SourceSizeAdjuster {
    constructor(fsLightbox) {
        this.fsLightbox = fsLightbox;
        this.maxWidth = 0;
        this.maxHeight = 0;
    }

    setMaxSourceDimensions() {
        this.maxWidth = parseInt(this.fsLightbox.elements.mediaHolder.current.style.width);
        this.maxHeight = parseInt(this.fsLightbox.elements.mediaHolder.current.style.height);
    }

    adjustSourceSize(index) {
        const element = this.fsLightbox.elements.sources[index].current;
        const sourceWidth = this.fsLightbox.sourceDimensions[index].width;
        const sourceHeight = this.fsLightbox.sourceDimensions[index].height;

        const coefficient = sourceWidth / sourceHeight;
        let newHeight = this.maxWidth / coefficient;
        console.log(this.maxWidth);

        const setDimensions =  () => {
            element.style.height = newHeight + "px";
            element.style.width = (newHeight * coefficient) + "px";
        };

        // wider than higher
        if (newHeight < this.maxHeight) {
            setDimensions();
            return;
        }

        //higher than wider
        if (sourceHeight > this.maxHeight) {
            newHeight = this.maxHeight;
        } else {
            newHeight = sourceHeight;
        }

        setDimensions();
    }

    adjustAllSourcesSizes() {

    }
}