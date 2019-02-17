import {
    SOURCE_DIMENSIONS_BREAK,
    SOURCE_DIMENSIONS_DECREASE_VALUE
} from "../constants/ResponsiveConstants";
import { checkIfUserIsOnMobileDevice } from "../utils/checkIfUserIsOnMobileDevice";

export class OnResize {
    /**
     * @param _ { FsLightbox }
     */
    constructor(_) {
        this._ = _;
        this.onResizeMethod = this.onResizeMethod.bind(this);
    }

    init() {
        this._.isMobile = checkIfUserIsOnMobileDevice();
        this.saveMaxSourcesDimensions();
        this.adjustMediaHolderSize();
        this.attachListener();
    }

    saveMaxSourcesDimensions() {
        (window.innerWidth < SOURCE_DIMENSIONS_BREAK) ?
            this._.maxSourceWidth = window.innerWidth :
            this._.maxSourceWidth = window.innerWidth - (window.innerWidth * SOURCE_DIMENSIONS_DECREASE_VALUE);

        this._.maxSourceHeight = window.innerHeight - (window.innerHeight * SOURCE_DIMENSIONS_DECREASE_VALUE);
    }

    adjustMediaHolderSize() {
        this._.elements.mediaHolder.current.style.width = this._.maxSourceWidth + 'px';
        this._.elements.mediaHolder.current.style.height = this._.maxSourceHeight + 'px';
    }

    attachListener() {
        window.addEventListener('resize', this.onResizeMethod);
    }

    removeListener() {
        window.removeEventListener('resize', this.onResizeMethod);
    }


    onResizeMethod() {
        this._.isMobile = checkIfUserIsOnMobileDevice();
        this.saveMaxSourcesDimensions();
        this.adjustMediaHolderSize();
        this._.sourceSizeAdjusterIterator.adjustAllSourcesSizes();
        this._.sourceHoldersTransformer.transformStageSources().withoutTimeout();
    }
}