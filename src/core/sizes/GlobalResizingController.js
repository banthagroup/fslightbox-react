import {
    SOURCE_DIMENSIONS_BREAK,
    SOURCE_DIMENSIONS_DECREASE_VALUE
} from "../../constants/responsiveConstants";

/**
 * @class
 * @param { FsLightbox.sourcesData } sourcesData
 * @param { FsLightbox.elements.sourcesHoldersWrapper } sourcesHoldersWrapper
 */
export function GlobalResizingController(
    {
        sourcesData,
        elements: {
            sourcesHoldersWrapper
        },
        core: {
            sourceHoldersTransformer: { transformStageSourceHolders }
        },
        injector: {
            sizes: { getSourceSizeAdjusterIterator },
        }
    }
) {
    const {
        adjustAllSourcesSizes
    } = getSourceSizeAdjusterIterator();
    let sourcesHoldersWrapperStyle;

    this.saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize = () => {
        saveMaxSourcesDimensions();
        adjustSourcesWrapperSize();
    };

    this.runAllResizingActions = () => {
        this.saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize();
        adjustAllSourcesSizes();
        transformStageSourceHolders().withoutTimeout();
    };

    const saveMaxSourcesDimensions = () => {
        (window.innerWidth < SOURCE_DIMENSIONS_BREAK) ?
            sourcesData.maxSourceWidth = window.innerWidth :
            sourcesData.maxSourceWidth = getDecreasedByResponsiveValueDimension(window.innerWidth);
        sourcesData.maxSourceHeight = getDecreasedByResponsiveValueDimension(window.innerHeight);
    };

    const getDecreasedByResponsiveValueDimension = (value) => value - (value * SOURCE_DIMENSIONS_DECREASE_VALUE);

    const adjustSourcesWrapperSize = () => {
        if (!sourcesHoldersWrapperStyle)
            sourcesHoldersWrapperStyle = sourcesHoldersWrapper.current.style;
        sourcesHoldersWrapperStyle.width = sourcesData.maxSourceWidth + 'px';
        sourcesHoldersWrapperStyle.height = sourcesData.maxSourceHeight + 'px';
    };
}