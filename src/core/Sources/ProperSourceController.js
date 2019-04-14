import { SourceSizeAdjuster } from "../Sizes/SourceSizeAdjuster";
import { getClassListOfElementInArrayByIndex } from "../../utils/Source/getClassListOfElementInArrayByIndex";
import { OPACITY_0_CLASS_NAME } from "../../constants/CssConstants";

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

    this.normalLoad = () => {
        ifSourceContainsOpacityOClassRemoveIt();
    };

    this.initialLoad = () => {
        ifSourceContainsOpacityOClassRemoveIt();
        isSourceAlreadyInitializedArray[index] = true;
        setUpSourceSizeAdjuster();
        adjustSourceSize();
        longFadeInSourceIfItsInStage();
    };

    const ifSourceContainsOpacityOClassRemoveIt = () => {
        const classList = getClassListOfElementInArrayByIndex(sources, index);
        if(classList.contains(OPACITY_0_CLASS_NAME)) {
            classList.remove(OPACITY_0_CLASS_NAME);
        }
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