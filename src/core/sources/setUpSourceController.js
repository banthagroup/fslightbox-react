import { getClassListOfElementInArrayByIndex } from "../../helpers/source/getClassListOfElementInArrayByIndex";
import { SourceSizeAdjuster } from "../sizes/SourceSizeAdjuster";
import { OPACITY_0_CLASS_NAME } from "../../constants/classes-names";

export function setUpSourceController(
    {
        stageIndexes,
        elements: { sources },
        collections: {
            sourceSizeAdjusters,
            sourcesHoldersTransformers
        },
        injector: {
            injectDependency
        },
        core: {
            sourceAnimator,
            stageManager,
            sourcesHoldersTransformer,
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
    };

    self.runInitialLoadActions = () => {
        self.runNormalLoadActions();
        setUpSourceSizeAdjuster();
        adjustSourceSize();
        longFadeInSourceIfItsInStage();
    };

    const ifSourceContainsOpacityOClassRemoveIt = () => {
        // TODO: TO IMPROVE WE HAVE OBJECT FOR THIS
        const classList = getClassListOfElementInArrayByIndex(sources, index);
        if (classList.contains(OPACITY_0_CLASS_NAME)) {
            classList.remove(OPACITY_0_CLASS_NAME);
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
        if (stageIndexes.current === index) {
            sourceAnimator.animateSourceFromIndex(index).longFadeIn();
        } else {
            sourcesHoldersTransformers[index].negative();
        }
    };
}
