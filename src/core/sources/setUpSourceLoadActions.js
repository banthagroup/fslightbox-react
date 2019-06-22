import { SourceSizeAdjuster } from "../sizes/SourceSizeAdjuster";
import { LONG_FADE_IN_CLASS_NAME, OPACITY_0_CLASS_NAME } from "../../constants/classes-names";
import { SOURCES } from "../../constants/elements";

export function setUpSourceLoadActions(
    {
        collections: {
            sourcesSizesAdjusters,
            sourcesHoldersTransformers
        },
        core: {
            classListManager,
            sourceLoadActions: self
        },
        injector: {
            injectDependency
        },
        stageIndexes
    }
) {
    let index;
    let defaultWidth;
    let defaultHeight;

    self.setIndex = (sourceIndex) => {
        index = sourceIndex;
    };

    self.setDefaultDimensions = (width, height) => {
        defaultWidth = width;
        defaultHeight = height;
    };

    self.runNormalLoadActions = () => {
        classListManager.removeFromElementInArrayAtIndexClass(
            SOURCES,
            index,
            OPACITY_0_CLASS_NAME
        );

        if (stageIndexes.current !== index) {
            sourcesHoldersTransformers[index].negative();
        }
    };

    self.runInitialLoadActions = () => {
        self.runNormalLoadActions();

        const sourceSizeAdjuster = injectDependency(SourceSizeAdjuster);
        sourceSizeAdjuster.setIndex(index);
        sourceSizeAdjuster.setDefaultDimensions(defaultWidth, defaultHeight);
        sourceSizeAdjuster.adjustSourceSize();
        sourcesSizesAdjusters[index] = sourceSizeAdjuster;

        if (stageIndexes.current === index) {
            classListManager.addToElementInArrayAtIndexClass(
                SOURCES,
                index,
                LONG_FADE_IN_CLASS_NAME
            );
        }
    };
}
