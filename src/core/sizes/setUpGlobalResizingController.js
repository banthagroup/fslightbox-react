import {
    SOURCE_DIMENSIONS_BREAK,
    SOURCE_DIMENSIONS_DECREASE_VALUE
} from "../../constants/responsiveConstants";

/**
 * @param { FsLightbox.sourcesData | { maxSourceWidth: number, maxSourceHeight: number} } sourcesData
 * @param { FsLightbox.elements.sourcesHoldersWrapper | { current }} sourcesHoldersWrapper
 * @param { FsLightbox.core.sourceHoldersTransformer | SetUpSourceHoldersTransformer } sourceHoldersTransformer
 */
export function setUpGlobalResizingController(
    {
        sourcesData,
        elements: {
            sourcesHoldersWrapper
        },
        core: {
            sourceHoldersTransformer,
            globalResizingController: self
        },
        injector: {
            sizes: { getSourceSizeAdjusterIterator },
        }
    }
) {
    const {
        adjustAllSourcesSizes
    } = getSourceSizeAdjusterIterator();

    self.saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize = () => {
        saveMaxSourcesDimensions();
        adjustSourcesWrapperSize();
    };

    self.runAllResizingActions = () => {
        self.saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize();
        adjustAllSourcesSizes();
        sourceHoldersTransformer.transformStageSourceHolders().withoutTimeout();
    };

    const saveMaxSourcesDimensions = () => {
        (window.innerWidth < SOURCE_DIMENSIONS_BREAK) ?
            sourcesData.maxSourceWidth = window.innerWidth :
            sourcesData.maxSourceWidth = getDecreasedByResponsiveValueDimension(window.innerWidth);
        sourcesData.maxSourceHeight = getDecreasedByResponsiveValueDimension(window.innerHeight);
    };

    const getDecreasedByResponsiveValueDimension = (value) => value - (value * SOURCE_DIMENSIONS_DECREASE_VALUE);

    const adjustSourcesWrapperSize = () => {
        getSourceHoldersWrapperStyle().width = sourcesData.maxSourceWidth + 'px';
        getSourceHoldersWrapperStyle().height = sourcesData.maxSourceHeight + 'px';
    };

    /** @return { CSSStyleDeclaration } */
    const getSourceHoldersWrapperStyle = () => {
        return sourcesHoldersWrapper.current.style;
    };
}