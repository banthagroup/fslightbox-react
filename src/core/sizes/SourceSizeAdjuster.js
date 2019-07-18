export function SourceSizeAdjuster({ data, elements: { sources } }) {
    let i = null;
    let defaultSourceWidth = 0;
    let defaultSourceHeight = 0;
    let ratio = 0;
    let newHeight = 0;

    this.setIndex = (index) => {
        i = index;
    };

    this.setDefaultDimensions = (width, height) => {
        defaultSourceWidth = width;
        defaultSourceHeight = height;
        ratio = defaultSourceWidth / defaultSourceHeight;
    };

    this.adjustSourceSize = () => {
        newHeight = data.maxSourceWidth / ratio;

        // wider than higher
        if (newHeight < data.maxSourceHeight) {
            if (defaultSourceWidth < data.maxSourceWidth) {
                newHeight = defaultSourceHeight;
            }
            setDimensions();
            return;
        }

        // higher than wider
        if (defaultSourceHeight > data.maxSourceHeight) {
            newHeight = data.maxSourceHeight;
        } else {
            newHeight = defaultSourceHeight;
        }

        setDimensions();
    };

    const setDimensions = () => {
        sources[i].current.style.width = (newHeight * ratio) + "px";
        sources[i].current.style.height = newHeight + "px";
    }
}
