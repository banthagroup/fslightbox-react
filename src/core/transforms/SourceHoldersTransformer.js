import { StageSourceHoldersTransformer } from "./stage-source-holders-transformers/StageSourceHoldersTransformer";
import { SourceHolderTransformer } from "./SourceHolderTransformer";

/**
 * @class
 * @param { FsLightbox } fsLightbox
 */
export function SourceHoldersTransformer(fsLightbox) {
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
        }
    } = fsLightbox;
    const sourceHolderTransformer = getSourceHolderTransformer();
    let sourceHoldersByValueTransformer = { stageSourcesIndexes: {} };

    /** @return { StageSourceHoldersTransformer } */
    this.transformStageSourceHolders = () => {
        return new StageSourceHoldersTransformer(fsLightbox);
    };

    this.transformStageSourceHoldersByValue = (value) => {
        // recreating an instance only when slide is change (it improves performance)
        if (sourceHoldersByValueTransformer.stageSourcesIndexes.current !== slideState.get() - 1) {
            sourceHoldersByValueTransformer = getStageSourceHoldersByValueTransformer();
        }
        sourceHoldersByValueTransformer.transformByValue(value);
    };

    /** @return { SourceHolderTransformer } */
    this.transformStageSourceHolderAtIndex = (index) => {
        sourceHolderTransformer.setSourceHolder(sourceHolders[index]);
        return sourceHolderTransformer;
    };

    this.isStageSourceHolderAtIndexValidForTransform = (index) => {
        return typeof index !== "undefined" && index !== slideState.get() - 1;
    };
}