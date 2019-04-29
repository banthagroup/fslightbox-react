import {
    SOURCE_DIMENSIONS_BREAK,
    SOURCE_DIMENSIONS_DECREASE_VALUE
} from "../../constants/responsiveConstants";

/**
 * @constructor
 * @param { FsLightbox.sourcesData | { maxSourceWidth: number, maxSourceHeight: number} } sourcesData
 * @param { FsLightbox.elements.sourcesHoldersWrapper | { current }} sourcesHoldersWrapper
 * @param { FsLightbox.core.sourceHoldersTransformer | SourceHoldersTransformer } sourceHoldersTransformer
 */
export function GlobalResizingController(
    {
        sourcesData,
        elements: {
            sourcesHoldersWrapper
        },
        core: {
            sourceHoldersTransformer,
        },
        injector: {
            sizes: { getSourceSizeAdjusterIterator },
        }
    }
) {
    const {
        adjustAllSourcesSizes
    } = getSourceSizeAdjusterIterator();

    this.saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize = () => {
        saveMaxSourcesDimensions();
        adjustSourcesWrapperSize();
    };

    this.runAllResizingActions = () => {
        this.saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize();
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