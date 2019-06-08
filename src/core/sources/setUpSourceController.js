import { getClassListOfElementInArrayByIndex } from "../../helpers/source/getClassListOfElementInArrayByIndex";
import { OPACITY_0_CLASS_NAME } from "../../constants/cssConstants";
import { SourceSizeAdjuster } from "../sizes/SourceSizeAdjuster";

export function setUpSourceController(
    {
        elements: { sources },
        collections: {
            sourceSizeAdjusters
        },
        injector: {
            injectDependency
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

    self.runNormalLoadActions = () => {
        ifSourceContainsOpacityOClassRemoveIt();
        ifSourceIsNotInStageTransformItNegative();
    };

    self.runInitialLoadActions = () => {
        self.runNormalLoadActions();
        setUpSourceSizeAdjuster();
        adjustSourceSize();
        longFadeInSourceIfItsInStage();
    };

    const ifSourceContainsOpacityOClassRemoveIt = () => {
        const classList = getClassListOfElementInArrayByIndex(sources, index);
        if (classList.contains(OPACITY_0_CLASS_NAME)) {
            classList.remove(OPACITY_0_CLASS_NAME);
        }
    };

    const ifSourceIsNotInStageTransformItNegative = () => {
        if (!stage.isSourceInStage(index)) {
            sourceHoldersTransformer.transformSourceHolderAtIndex(index).negative()
        }
    };

    const setUpSourceSizeAdjuster = () => {
        const sourceSizeAdjuster = injectDependency(SourceSizeAdjuster);
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
}
