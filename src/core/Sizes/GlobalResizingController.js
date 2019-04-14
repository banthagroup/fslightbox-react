import {
    SOURCE_DIMENSIONS_BREAK,
    SOURCE_DIMENSIONS_DECREASE_VALUE
} from "../../constants/ResponsiveConstants";

/**
 * @class
 * @param { FsLightbox.sourcesData } sourcesData
 * @param { FsLightbox.elements.sourcesWrapper } sourcesWrapper
 */
export function GlobalResizingController(
    {
        sourcesData,
        elements: {
            sourcesWrapper
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
    let sourcesWrapperStyle;

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
        if (!sourcesWrapperStyle)
            sourcesWrapperStyle = sourcesWrapper.current.style;
        sourcesWrapperStyle.width = sourcesData.maxSourceWidth + 'px';
        sourcesWrapperStyle.height = sourcesData.maxSourceHeight + 'px';
    };
}