import { SourceSizeAdjuster } from "./SourceSizeAdjuster";
import { FADE_IN_CLASS_NAME, FADE_IN_COMPLETE_CLASS_NAME } from "../../constants/CssConstants";

/**
 * @class
 */
export function ProperSourceController(fsLightbox) {
    const {
        sourcesData: { isSourceAlreadyLoadedArray, sourcesDimensions },
        elements: { sources },
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
        onFirstSourceLoad();
    };


    const onFirstSourceLoad = () => {
        // fsLightbox.elements.sources[index].current.classList.remove('fslightbox-opacity-0');
        fsLightbox.sourcesData.isSourceAlreadyLoadedArray[index] = true;
        // we are creating source size adjuster after first load because we need already source dimensions
        const sourceSizeAdjuster = new SourceSizeAdjuster(fsLightbox);
        sourceSizeAdjuster.setIndex(index);
        fsLightbox.collections.sourceSizeAdjusters[index] = sourceSizeAdjuster;

        onSourceLoad();
    };

    const onSourceLoad = () => {
        fadeInSource();
        // source size adjuster may be not set if source is invalid
        if (fsLightbox.collections.sourceSizeAdjusters[index])
            fsLightbox.collections.sourceSizeAdjusters[index].adjustSourceSize();
    };


    const fadeInSource = () => {
        // we are fading in source only if it's in stage
        if (!fsLightbox.core.stageSources.isSourceInStage(index))
            return;

        // we will add longer fade-in for better UX
        if (index === fsLightbox.state.slide - 1) {
            fsLightbox.elements.sources[index].current.classList.add(FADE_IN_COMPLETE_CLASS_NAME)
        } else {
            fsLightbox.elements.sources[index].current.classList.add(FADE_IN_CLASS_NAME);
        }
    };
}