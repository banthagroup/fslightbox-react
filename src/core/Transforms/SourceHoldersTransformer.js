import { StageSourceHoldersTransformer } from "./StageSourceHoldersTransformers/StageSourceHoldersTransformer";
import { SourceHolderTransformer } from "./SourceHolderTransformer";

/**
 * @class
 * @param { FsLightbox.injector.transforms.getStageSourceHoldersByValueTransformer
 * | function(): StageSourceHoldersByValueTransformer } getStageSourceHoldersByValueTransformer
 *  * @param { FsLightbox.injector.transforms.getStageSourceHoldersTransformer
 * | function(): StageSourceHoldersTransformer } getStageSourceHoldersTransformer
 */
export function SourceHoldersTransformer(
    {
        getters: { getSlide },
        elements: { sourceHolders },
        injector: {
            transforms: {
                getStageSourceHoldersTransformer,
                getStageSourceHoldersByValueTransformer,
                getSourceHolderTransformer
            }
        }
    }
) {
    /** @type {function(): StageSourceHoldersTransformer} */
    this.transformStageSourceHolders = getStageSourceHoldersTransformer;
    
    this.transformStageSourceHoldersByValue = (value) =>
        getStageSourceHoldersByValueTransformer().transformByValue(value);


    /** @return { SourceHolderTransformer } */
    this.transformStageSourceHolderAtIndex = (index) => {
        this.transformStageSourceHoldersByValue(0);
        const sourceHoldersTransformer = getSourceHolderTransformer();
        sourceHoldersTransformer.setSourceHolder(sourceHolders[index]);
        return sourceHoldersTransformer;
    };

    this.isStageSourceHolderAtIndexSet = (index) => {
        return typeof index !== "undefined" && index !== getSlide() - 1;
    };
}