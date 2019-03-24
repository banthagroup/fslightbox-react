import {
    SOURCE_DIMENSIONS_BREAK,
    SOURCE_DIMENSIONS_DECREASE_VALUE
} from "../../constants/ResponsiveConstants";

/**
 * @class SizeController
 * @param { FsLightbox } FsLightbox
 * @param { FsLightbox.sourcesData } FsLightbox.sourcesData
 * @param { FsLightbox.elements } FsLightbox.elements
 */
export function SizeController(
    {
        sourcesData,
        elements: { mediaHolder }
    }
) {
    this.controlAll = () => {
        saveMaxSourcesDimensions();
        this.adjustMediaHolderSize();
    };

    /** @method */
    this.adjustMediaHolderSize = () => {
        mediaHolder.current.style.width = sourcesData.maxSourceWidth + 'px';
        mediaHolder.current.style.height = sourcesData.maxSourceHeight + 'px';
    };

    const saveMaxSourcesDimensions = () => {
        (window.innerWidth < SOURCE_DIMENSIONS_BREAK) ?
            sourcesData.maxSourceWidth = window.innerWidth :
            sourcesData.maxSourceWidth = window.innerWidth - (window.innerWidth * SOURCE_DIMENSIONS_DECREASE_VALUE);

        sourcesData.maxSourceHeight = window.innerHeight - (window.innerHeight * SOURCE_DIMENSIONS_DECREASE_VALUE);
    };
}