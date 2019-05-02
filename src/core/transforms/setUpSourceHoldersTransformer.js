import { StageSourceHoldersTransformer } from "./stage-source-holders-transformers/StageSourceHoldersTransformer";
import { SourceHolderTransformer } from "./SourceHolderTransformer";
import { getInitialStageSourceHoldersByValueTransformer } from "./getInitialStageSourceHoldersByValueTransformer";
import { StageSourceHoldersByValueTransformer } from "./stage-source-holders-transformers/StageSourceHoldersByValueTransformer";

export function setUpSourceHoldersTransformer(fsLightbox) {
    const {
        componentsStates: { slide: slideState },
        elements: { sourceHolders },
        injector: {
            injectDependency
        },
        core: {
            sourceHoldersTransformer: self
        }
    } = fsLightbox;
    const sourceHolderTransformer = injectDependency(SourceHolderTransformer);
    let sourceHoldersByValueTransformer = getInitialStageSourceHoldersByValueTransformer();

    /** @return { StageSourceHoldersTransformer } */
    self.transformStageSourceHolders = () => new StageSourceHoldersTransformer(fsLightbox);

    self.transformStageSourceHoldersByValue = (value) => {
        // recreating an instance only when slide is change (it improves performance)
        if (sourceHoldersByValueTransformer.stageSourcesIndexes.current !== slideState.get() - 1) {
            sourceHoldersByValueTransformer = injectDependency(StageSourceHoldersByValueTransformer);
        }
        sourceHoldersByValueTransformer.transformByValue(value);
    };

    /** @return { SourceHolderTransformer } */
    self.transformSourceHolderAtIndex = (index) => {
        sourceHolderTransformer.setSourceHolder(sourceHolders[index]);
        return sourceHolderTransformer;
    };

    self.isStageSourceHolderAtIndexValidForTransform = (index) => {
        return typeof index !== "undefined" && index !== slideState.get() - 1;
    };
}