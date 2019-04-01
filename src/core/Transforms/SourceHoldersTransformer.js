import { StageSourceHoldersTransformer } from "./StageSourceHoldersTransformers/StageSourceHoldersTransformer";

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
                getStageSourceHoldersByValueTransformer,
                getSourceHolderTransformer
            }
        }
    } = fsLightbox;

    /** @return { StageSourceHoldersTransformer } */
    this.transformStageSourceHolders = () => {
        return new StageSourceHoldersTransformer(fsLightbox);
    };

    this.transformStageSourceHoldersByValue = (value) => {
        getStageSourceHoldersByValueTransformer().transformByValue(value);
    };

    /** @return { SourceHolderTransformer }  */
    this.transformStageSourceHolderAtIndex = (index) => {
        const sourceHoldersTransformer = getSourceHolderTransformer();
        sourceHoldersTransformer.setSourceHolder(sourceHolders[index]);
        return sourceHoldersTransformer;
    };

    this.isStageSourceHolderAtIndexValidForTransform = (index) => {
        return typeof index !== "undefined" && index !== getSlide() - 1;
    };
}