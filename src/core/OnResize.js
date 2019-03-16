import {
    SOURCE_DIMENSIONS_BREAK,
    SOURCE_DIMENSIONS_DECREASE_VALUE
} from "../constants/ResponsiveConstants";
import { checkIfUserIsOnMobileDevice } from "../utils/checkIfUserIsOnMobileDevice";

export class OnResize {
    /** @param fsLightbox { FsLightbox }*/
    constructor(fsLightbox) {
        this.fsLightbox = fsLightbox;
        this._onResizeMethod = this._onResizeMethod.bind(this);
    }

    init() {
        this.fsLightbox.isMobile = checkIfUserIsOnMobileDevice();
        this._saveMaxSourcesDimensions();
        this.adjustMediaHolderSize();
        this.attachListener();
    }

    adjustMediaHolderSize() {
        this.fsLightbox.elements.mediaHolder.current.style.width = this.fsLightbox.maxSourceWidth + 'px';
        this.fsLightbox.elements.mediaHolder.current.style.height = this.fsLightbox.maxSourceHeight + 'px';
    }

    attachListener() {
        window.addEventListener('resize', this._onResizeMethod);
    }

    removeListener() {
        window.removeEventListener('resize', this._onResizeMethod);
    }

    _saveMaxSourcesDimensions() {
        (window.innerWidth < SOURCE_DIMENSIONS_BREAK) ?
            this.fsLightbox.maxSourceWidth = window.innerWidth :
            this.fsLightbox.maxSourceWidth = window.innerWidth - (window.innerWidth * SOURCE_DIMENSIONS_DECREASE_VALUE);

        this.fsLightbox.maxSourceHeight = window.innerHeight - (window.innerHeight * SOURCE_DIMENSIONS_DECREASE_VALUE);
    }

    _onResizeMethod() {
        this.fsLightbox.isMobile = checkIfUserIsOnMobileDevice();
        this._saveMaxSourcesDimensions();
        this.adjustMediaHolderSize();
        this.fsLightbox.core.sourceSizeAdjusterIterator.adjustAllSourcesSizes();
        this.fsLightbox.core.sourceHoldersTransformer.transformStageSources().withoutTimeout();
    }
}