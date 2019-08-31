export function SourceStyler({ data, elements: { sources } }, i, defaultWidth, defaultHeight) {
    const ratio = defaultWidth / defaultHeight;
    let newHeight = 0;

    this.styleSize = () => {
        newHeight = data.maxSourceWidth / ratio;

        // wider than higher
        if (newHeight < data.maxSourceHeight) {
            if (defaultWidth < data.maxSourceWidth) {
                newHeight = defaultHeight;
            }
            return updateDimensions();
        }

        // higher than wider
        if (defaultHeight > data.maxSourceHeight) {
            newHeight = data.maxSourceHeight;
        } else {
            newHeight = defaultHeight;
        }

        updateDimensions();
    };

    const updateDimensions = () => {
        const style = sources[i].current.style;
        style.width = newHeight * ratio + 'px';
        style.height = newHeight + 'px';
    }
}
