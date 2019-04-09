/**
 * @class
 */
export function ProperSourceController(fsLightbox) {
    const {
        sourcesData: { isSourceAlreadyLoadedArray, sourcesDimensions },
        elements: { sources },
        componentsControllers: { sources: sourcesControllers }
    } = fsLightbox;

    let index;
    let sourceWidth;
    let sourceHeight;

    this.setIndex = (sourceIndex) => {
        index = sourceIndex;
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
        sourcesControllers[index].onFirstSourceLoad();
    };
}