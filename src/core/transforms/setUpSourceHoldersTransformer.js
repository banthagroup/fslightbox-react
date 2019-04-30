import { StageSourceHoldersTransformer } from "./stage-source-holders-transformers/StageSourceHoldersTransformer";
import { SourceHolderTransformer } from "./SourceHolderTransformer";
import { getInitialStageSourceHoldersByValueTransformer } from "./getInitialStageSourceHoldersByValueTransformer";

export function setUpSourceHoldersTransformer(fsLightbox) {
    const {
        componentsStates: { slide: slideState },
        elements: { sourceHolders },
        injector: {
            transforms: {
                /** @type { function(): StageSourceHoldersByValueTransformer } */
                getStageSourceHoldersByValueTransformer,
                /** @type { function(): SourceHolderTransformer } */
                getSourceHolderTransformer,
            }
        },
        core: {
            sourceHoldersTransformer: self
        }
    } = fsLightbox;
    const sourceHolderTransformer = getSourceHolderTransformer();
    let sourceHoldersByValueTransformer = getInitialStageSourceHoldersByValueTransformer();

    /** @return { StageSourceHoldersTransformer } */
    self.transformStageSourceHolders = () => {
        return new StageSourceHoldersTransformer(fsLightbox);
    };

    self.transformStageSourceHoldersByValue = (value) => {
        // recreating an instance only when slide is change (it improves performance)
        if (sourceHoldersByValueTransformer.stageSourcesIndexes.current !== slideState.get() - 1) {
            sourceHoldersByValueTransformer = getStageSourceHoldersByValueTransformer();
        }
        sourceHoldersByValueTransformer.transformByValue(value);
    };

    /** @return { SourceHolderTransformer } */
    self.transformStageSourceHolderAtIndex = (index) => {
        sourceHolderTransformer.setSourceHolder(sourceHolders[index]);
        return sourceHolderTransformer;
    };

    self.isStageSourceHolderAtIndexValidForTransform = (index) => {
        return typeof index !== "undefined" && index !== slideState.get() - 1;
    };
}