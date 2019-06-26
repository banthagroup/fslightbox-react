import { SourceSizeAdjuster } from "../sizes/SourceSizeAdjuster";
import { LONG_FADE_IN_CLASS_NAME, OPACITY_0_CLASS_NAME } from "../../constants/classes-names";
import { SOURCES } from "../../constants/elements";

export function setUpSourceLoadActions(
    {
        collections: {
            sourcesSizesAdjusters,
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
    let loadedSourceClassListManager;

    self.setIndex = (sourceIndex) => {
        index = sourceIndex;
    };

    self.setDefaultDimensions = (width, height) => {
        defaultWidth = width;
        defaultHeight = height;
    };

    self.runNormalLoadActions = () => {
        loadedSourceClassListManager = classListManager.manageArrayElementAtIndex(SOURCES, index);
        loadedSourceClassListManager.remove(OPACITY_0_CLASS_NAME);
    };

    self.runInitialLoadActions = () => {
        self.runNormalLoadActions();

        const sourceSizeAdjuster = injectDependency(SourceSizeAdjuster);
        sourceSizeAdjuster.setIndex(index);
        sourceSizeAdjuster.setDefaultDimensions(defaultWidth, defaultHeight);
        sourceSizeAdjuster.adjustSourceSize();
        sourcesSizesAdjusters[index] = sourceSizeAdjuster;

        if (stageIndexes.current === index) {
            loadedSourceClassListManager.add(LONG_FADE_IN_CLASS_NAME);
        }
    };
}
