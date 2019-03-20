import { StageSourceHoldersTransformer } from "./StageSourceHoldersTransformer";

/**
 * @class SourceHoldersTransformer
 * @param { FsLightbox.core } core
 * @param { FsLightbox.getters } getters
 * @param { FsLightbox.sourcesData } sourcesData
 * @param { FsLightbox.elements } elements
 */
export function SourceHoldersTransformer({ core, getters, sourcesData, elements }) {
    /** @return {StageSourceHoldersTransformer} */
    this.transformStageSourceHolders = () =>
        new StageSourceHoldersTransformer({
            core: core,
            getters: getters
        });

    this.transformNegative = (i) => {
        getStyleOfSourceHolderByIndex(i).transform = 'translate(' + -sourcesData.slideDistance * window.innerWidth + 'px,0)';
    };

    this.transformZero = (i) => {
        getStyleOfSourceHolderByIndex(i).transform = 'translate(0,0)';
    };

    this.transformPositive = (i) => {
        getStyleOfSourceHolderByIndex(i).transform = 'translate(' + sourcesData.slideDistance * window.innerWidth + 'px,0)';
    };

    const getStyleOfSourceHolderByIndex = (index) => {
        return elements.sourceHolders[index].current.style;
    }
}