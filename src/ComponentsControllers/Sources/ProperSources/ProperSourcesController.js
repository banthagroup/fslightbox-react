/**
 * @class
 */
export function ProperSourcesController(
    {
        sourcesData: { isSourceAlreadyLoadedArray, sourcesDimensions },
        elements: { sources },

    }
) {
    let index;
    let onFirstSourceLoad;
    let sourceWidth;
    let sourceHeight;

    this.setIndex = (sourceIndex) => {
        index = sourceIndex;
    };

    this.setOnFirstSourceLoad = (func) => {
        onFirstSourceLoad = func;
    };

    this.setSourceWidth = (width) => {
        sourceWidth = width;
    };

    this.setSourceHeight = (height) => {
        sourceHeight = height
    };

    this.handleLoad = () => {
        sources[index].current.classList.remove('fslightbox-opacity-0');
        if (isSourceAlreadyLoadedArray[index]) {
            return;
        }
        sourcesDimensions[index] = {
            width: sourceWidth,
            height: sourceHeight
        };
        onFirstSourceLoad();
    };
}