import { StageSourceHoldersTransformer } from "./StageSourceHoldersTransformers/StageSourceHoldersTransformer";
import { SourceHolderTransformer } from "./SourceHolderTransformer";

/**
 * @class
 * @param { FsLightbox } fsLightbox
 */
export function SourceHoldersTransformer(fsLightbox) {
    const {
        getters: { getSlide },
        elements: { sourceHolders },
        injector: {
            transforms: {
                /** @type { function(): StageSourceHoldersByValueTransformer } */
                getStageSourceHoldersByValueTransformer,
                /** @type { function(): SourceHolderTransformer } */
                getSourceHolderTransformer,
                /** @type { function():  { stageSourcesIndexes } }  */
                getInitialStageSourceHoldersByValueTransformer,
            }
        }
    } = fsLightbox;
    const sourceHolderTransformer = getSourceHolderTransformer();
    let sourceHoldersByValueTransformer = getInitialStageSourceHoldersByValueTransformer();

    /** @return { StageSourceHoldersTransformer } */
    this.transformStageSourceHolders = () => {
        return new StageSourceHoldersTransformer(fsLightbox);
    };

    this.transformStageSourceHoldersByValue = (value) => {
        if (sourceHoldersByValueTransformer.stageSourcesIndexes.current !== getSlide() - 1) {
            sourceHoldersByValueTransformer = getStageSourceHoldersByValueTransformer();
        }
        sourceHoldersByValueTransformer.transformByValue(value);
    };

    /** @return { SourceHolderTransformer }  */
    this.transformStageSourceHolderAtIndex = (index) => {
        sourceHolderTransformer.setSourceHolder(sourceHolders[index]);
        return sourceHolderTransformer;
    };

    this.isStageSourceHolderAtIndexValidForTransform = (index) => {
        return typeof index !== "undefined" && index !== getSlide() - 1;
    };
}