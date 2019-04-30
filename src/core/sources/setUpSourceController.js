import { getClassListOfElementInArrayByIndex } from "../../helpers/source/getClassListOfElementInArrayByIndex";
import { OPACITY_0_CLASS_NAME } from "../../constants/cssConstants";

export function setUpSourceController(
    {
        sourcesData: { isSourceAlreadyInitializedArray },
        elements: { sources },
        collections: {
            sourceSizeAdjusters
        },
        injector: {
            source: {
                getSourceSizeAdjuster
            }
        },
        core: {
            sourceAnimator,
            stage,
            sourceHoldersTransformer,
            sourceController: self
        }
    }
) {
    let index;
    let sourceWidth;
    let sourceHeight;

    self.setIndex = (sourceIndex) => {
        index = sourceIndex;
    };

    self.setSourceWidth = (width) => {
        sourceWidth = width;
    };

    self.setSourceHeight = (height) => {
        sourceHeight = height
    };

    self.normalLoad = () => {
        ifSourceContainsOpacityOClassRemoveIt();
        ifSourceIsNotInStageTransformItNegative();
    };

    self.initialLoad = () => {
        self.normalLoad();
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

    const ifSourceIsNotInStageTransformItNegative = () => {
        if (!stage.isSourceInStage(index)) {
            sourceHoldersTransformer.transformStageSourceHolderAtIndex(index).negative()
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
        if (!stage.isSourceInStage(index))
            return;
        sourceAnimator.animateSourceFromIndex(index).longFadeIn();
    };

    const setIsSourceAlreadyInitializedToTrue = () => {
        isSourceAlreadyInitializedArray[index] = true;
    };
}