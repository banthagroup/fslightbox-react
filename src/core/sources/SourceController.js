import { getClassListOfElementInArrayByIndex } from "../../helpers/source/getClassListOfElementInArrayByIndex";
import { OPACITY_0_CLASS_NAME } from "../../constants/cssConstants";

/**
 * @constructor
 */
export function SourceController(
    {
        sourcesData: { isSourceAlreadyInitializedArray },
        elements: { sources },
        collections: {
            sourceSizeAdjusters
        },
        core: {
            sourceAnimator: {
                animateSourceFromIndex
            },
            stageSources: { isSourceInStage },
        },
        injector: {
            source: {
                getSourceSizeAdjuster
            }
        }
    }
) {
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
        setUpSourceSizeAdjuster();
        adjustSourceSize();
        longFadeInSourceIfItsInStage();
        setIsSourceAlreadyInitializedToTrue();
    };

    const ifSourceContainsOpacityOClassRemoveIt = () => {
        const classList = getClassListOfElementInArrayByIndex(sources, index);
        if (classList.contains(OPACITY_0_CLASS_NAME)) {
            classList.remove(OPACITY_0_CLASS_NAME);
        }
    };

    const setUpSourceSizeAdjuster = () => {
        const sourceSizeAdjuster = getSourceSizeAdjuster();
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

    const setIsSourceAlreadyInitializedToTrue = () => {
        isSourceAlreadyInitializedArray[index] = true;
    };
}