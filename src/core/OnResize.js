import {
    SOURCE_DIMENSIONS_BREAK,
    SOURCE_DIMENSIONS_DECREASE_VALUE
} from "../constants/ResponsiveConstants";
import { checkIfUserIsOnMobileDevice } from "../utils/checkIfUserIsOnMobileDevice";

/**
 * @param { FsLightbox } FsLightbox
 * @param { FsLightbox.sourcesData } FsLightbox.sourcesData
 * @param { FsLightbox.elements } FsLightbox.elements
 * @param { FsLightbox.core } FsLightbox.core
 * @param { FsLightbox.data } FsLightbox.data
 * @class
 */
export function OnResize({ sourcesData, elements, core, data }) {
    this.init = () => {
        data.isMobile = checkIfUserIsOnMobileDevice();
        saveMaxSourcesDimensions();
        this.adjustMediaHolderSize();
        this.attachListener();
    };

    this.adjustMediaHolderSize = () => {
        elements.mediaHolder.current.style.width = sourcesData.maxSourceWidth + 'px';
        elements.mediaHolder.current.style.height = sourcesData.maxSourceHeight + 'px';
    };

    this.attachListener = () => {
        window.addEventListener('resize', onResizeMethod);
    };

    this.removeListener = () => {
        window.removeEventListener('resize', onResizeMethod);
    };

    const saveMaxSourcesDimensions = () => {
        (window.innerWidth < SOURCE_DIMENSIONS_BREAK) ?
            sourcesData.maxSourceWidth = window.innerWidth :
            sourcesData.maxSourceWidth = window.innerWidth - (window.innerWidth * SOURCE_DIMENSIONS_DECREASE_VALUE);

        sourcesData.maxSourceHeight = window.innerHeight - (window.innerHeight * SOURCE_DIMENSIONS_DECREASE_VALUE);
    };

    const onResizeMethod = () => {
        data.isMobile = checkIfUserIsOnMobileDevice();
        saveMaxSourcesDimensions();
        this.adjustMediaHolderSize();
        core.sourceSizeAdjusterIterator.adjustAllSourcesSizes();
        core.sourceHoldersTransformer.transformStageSources().withoutTimeout();
    }
}