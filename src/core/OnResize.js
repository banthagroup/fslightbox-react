import {
    SOURCE_DIMENSIONS_BREAK,
    SOURCE_DIMENSIONS_DECREASE_VALUE
} from "../constants/ResponsiveConstants";
import { checkIfUserIsOnMobileDevice } from "../utils/checkIfUserIsOnMobileDevice";

export class OnResize {

    constructor(fsLightbox) {
        this.fsLightbox = fsLightbox;
        this.onResizeMethod = this.onResizeMethod.bind(this);
    }

    init() {
        this.saveMaxSourcesDimensions();
        this.adjustMediaHolderSize();
        this.attachListener();
    }

    saveMaxSourcesDimensions() {
        (window.innerWidth < SOURCE_DIMENSIONS_BREAK) ?
            this.fsLightbox.maxSourceWidth = window.innerWidth :
            this.fsLightbox.maxSourceWidth = window.innerWidth - (window.innerWidth * SOURCE_DIMENSIONS_DECREASE_VALUE);

        this.fsLightbox.maxSourceHeight = window.innerHeight - (window.innerHeight * SOURCE_DIMENSIONS_DECREASE_VALUE);
    }

    adjustMediaHolderSize() {
        this.fsLightbox.elements.mediaHolder.current.style.width = this.fsLightbox.maxSourceWidth + 'px';
        this.fsLightbox.elements.mediaHolder.current.style.height = this.fsLightbox.maxSourceHeight + 'px';
    }

    attachListener() {
        window.addEventListener('resize', this.onResizeMethod);
    }

    removeListener() {
        window.removeEventListener('resize', this.onResizeMethod);
    }


    onResizeMethod() {
        this.fsLightbox.setState({
            isMobile: checkIfUserIsOnMobileDevice()
        });
        this.saveMaxSourcesDimensions();
        this.adjustMediaHolderSize();
        this.fsLightbox.sourceSizeIterator.adjustAllSourcesSizes();
    }
}