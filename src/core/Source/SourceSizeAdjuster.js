/**
 * @param { FsLightbox.sourcesData } sourcesData
 * @param { FsLightbox.elements.sources } sources
 * @class
 */
export function SourceSizeAdjuster({ sourcesData, elements: { sources } }) {
    let i = null;
    let sourceWidth = 0;
    let sourceHeight = 0;
    let ratio = 0;
    let newHeight = 0;

    this.setIndex = (index) => {
        i = index;
        sourceWidth = sourcesData.sourcesDimensions[index].width;
        sourceHeight = sourcesData.sourcesDimensions[index].height;
        ratio = sourceWidth / sourceHeight;
    };

    this.adjustSourceSize = () => {
        newHeight = sourcesData.maxSourceWidth / ratio;

        // wider than higher
        if (newHeight < sourcesData.maxSourceHeight) {
            if (sourceWidth < sourcesData.maxSourceWidth) {
                newHeight = sourceHeight;
            }
            setDimensions();
            return;
        }

        // higher than wider
        if (sourceHeight > sourcesData.maxSourceHeight) {
            newHeight = sourcesData.maxSourceHeight;
        } else {
            newHeight = sourceHeight;
        }

        setDimensions();
    };

    const setDimensions = () => {
        sources[i].current.style.height = newHeight + "px";
        sources[i].current.style.width = (newHeight * ratio) + "px";
    }
}