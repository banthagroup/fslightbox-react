/**
 * @constructor
 */
export function SourceSizeAdjuster({ sourcesData, elements: { sources } }) {
    let i = null;
    let maxSourceWidth = 0;
    let maxSourceHeight = 0;
    let ratio = 0;
    let newHeight = 0;

    this.setIndex = (index) => {
        i = index;
    };

    this.setMaxDimensions = (width, height) => {
        maxSourceWidth = width;
        maxSourceHeight = height;
        ratio = maxSourceWidth / maxSourceHeight;
    };

    this.adjustSourceSize = () => {
        newHeight = sourcesData.maxSourceWidth / ratio;

        // wider than higher
        if (newHeight < sourcesData.maxSourceHeight) {
            if (maxSourceWidth < sourcesData.maxSourceWidth) {
                newHeight = maxSourceHeight;
            }
            setDimensions();
            return;
        }

        // higher than wider
        if (maxSourceHeight > sourcesData.maxSourceHeight) {
            newHeight = sourcesData.maxSourceHeight;
        } else {
            newHeight = maxSourceHeight;
        }

        setDimensions();
    };

    const setDimensions = () => {
        sources[i].current.style.height = newHeight + "px";
        sources[i].current.style.width = (newHeight * ratio) + "px";
    }
}
