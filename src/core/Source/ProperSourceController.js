import { SourceSizeAdjuster } from "./SourceSizeAdjuster";

/**
 * @class
 * @param { FsLightbox } fsLightbox
 */
export function ProperSourceController(fsLightbox) {
    const {
        sourcesData: { isSourceAlreadyInitializedArray },
        elements: { sources },
        collections: {
            /** @var { Array<SourceSizeAdjuster> } sourceSizeAdjusters */
            sourceSizeAdjusters
        },
        core: {
            sourceAnimator: {
                /** @var { function(number): SourceAnimator } animateSourceFromIndex */
                animateSourceFromIndex
            },
            stageSources: { isSourceInStage }
        },
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
        if (!isSourceAlreadyInitialized()) {
            initSource();
        }
    };

    const isSourceAlreadyInitialized = () => {
        return isSourceAlreadyInitializedArray[index];
    };


    const initSource = () => {
        isSourceAlreadyInitializedArray[index] = true;
        setUpSourceSizeAdjuster();
        adjustSourceSize();
        longFadeInSourceIfItsInStage();
    };

    const setUpSourceSizeAdjuster = () => {
        const sourceSizeAdjuster = new SourceSizeAdjuster(fsLightbox);
        sourceSizeAdjuster.setIndex(index);
        sourceSizeAdjuster.setMaxDimensions(sourceWidth, sourceHeight);
        sourceSizeAdjusters[index] = sourceSizeAdjuster;
    };

    const adjustSourceSize = () => {
        sourceSizeAdjusters[index].adjustSourceSize();
    };

    const longFadeInSourceIfItsInStage = () => {
        if (!isSourceInStage(index))
            return;
        animateSourceFromIndex(index).longFadeIn();
    };
}