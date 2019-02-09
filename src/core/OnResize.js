import {
    MEDIA_HOLDER_BREAK,
    MEDIA_HOLDER_SIZE_DECREASE_VALUE
} from "../constants/ResponsiveConstants";
import { checkIfUserIsOnMobileDevice } from "../utils/checkIfUserIsOnMobileDevice";

export class OnResize {

    constructor(fsLightbox) {
        this.fsLightbox = fsLightbox;
        this.onResizeMethod = this.onResizeMethod.bind(this);
    }

    init() {
        this.scaleMediaHolder();
        this.attachListener();
    }

    scaleMediaHolder() {
        (window.innerWidth < MEDIA_HOLDER_BREAK) ?
            this.fsLightbox.elements.mediaHolder.current.style.width = window.innerWidth + 'px' :
            this.fsLightbox.elements.mediaHolder.current.style.width = window.innerWidth - (window.innerWidth * MEDIA_HOLDER_SIZE_DECREASE_VALUE) + 'px';

        this.fsLightbox.elements.mediaHolder.current.style.height = window.innerHeight - (window.innerHeight * MEDIA_HOLDER_SIZE_DECREASE_VALUE) + 'px';
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
        this.scaleMediaHolder();
    }
}