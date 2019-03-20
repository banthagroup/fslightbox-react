import {
    SOURCE_DIMENSIONS_BREAK,
    SOURCE_DIMENSIONS_DECREASE_VALUE
} from "../constants/ResponsiveConstants";

/**
 * @param { FsLightbox } FsLightbox
 * @param { FsLightbox.sourcesData } FsLightbox.sourcesData
 * @param { FsLightbox.elements } FsLightbox.elements
 * @param { FsLightbox.core.sourceSizeAdjusterIterator | SourceSizeAdjusterIterator } sourceSizeAdjusterIterator
 * @param { FsLightbox.core.sourceHoldersTransformer |  SourceHoldersTransformer } sourceHoldersTransformer
 * @class
 */
export function OnResize(
    {
        sourcesData,
        setters: { sourcesData: { setMaxSourceWidth, setMaxSourceHeight } },
        elements: { mediaHolder },
        core: { sourceSizeAdjusterIterator, sourceHoldersTransformer }
    }
) {
    this.init = () => {
        saveMaxSourcesDimensions();
        this.adjustMediaHolderSize();
        this.attachListener();
    };

    this.adjustMediaHolderSize = () => {
        mediaHolder.current.style.width = sourcesData.maxSourceWidth + 'px';
        mediaHolder.current.style.height = sourcesData.maxSourceHeight + 'px';
    };

    this.attachListener = () => {
        window.addEventListener('resize', onResizeMethod);
    };

    this.removeListener = () => {
        window.removeEventListener('resize', onResizeMethod);
    };

    const saveMaxSourcesDimensions = () => {
        (window.innerWidth < SOURCE_DIMENSIONS_BREAK) ?
            setMaxSourceWidth(window.innerWidth) :
            setMaxSourceWidth(window.innerWidth - (window.innerWidth * SOURCE_DIMENSIONS_DECREASE_VALUE));

        setMaxSourceHeight(window.innerHeight - (window.innerHeight * SOURCE_DIMENSIONS_DECREASE_VALUE));
    };

    const onResizeMethod = () => {
        saveMaxSourcesDimensions();
        this.adjustMediaHolderSize();
        sourceSizeAdjusterIterator.adjustAllSourcesSizes();
        sourceHoldersTransformer.transformStageSourceHolders().withoutTimeout();
    }
}