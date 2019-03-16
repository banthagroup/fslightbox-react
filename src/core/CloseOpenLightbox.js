import { CONTAINER_FADE_OUT_TIME } from "../constants/CoreConstants";
import { SlideChanger } from "./Slide/SlideChanger";

export default class CloseOpenLightbox {
    /** @param fsLightbox { FsLightbox } */
    constructor(fsLightbox) {
        this.fsLightbox = fsLightbox;
        this.documentClassList = document.documentElement.classList;
        this.fadingOut = false;
        this.componentMountedAfterClose = this.componentMountedAfterClose.bind(this);
    }

    openLightbox() {
        this.fsLightbox.setState({
            isOpen: true,
        }, () => {
            this.componentMountedAfterOpen();
            this.addOpeningClassToDocument();
        });
    }

    addOpeningClassToDocument() {
        this.documentClassList.add('fslightbox-open');
    }

    closeLightbox() {
        if (this.fadingOut) return;
        this.fadingOut = true;
        this.fsLightbox.elements.container.current.classList.add('fslightbox-fade-out-complete');
        setTimeout(() => {
            this.afterFadeOut();
        }, CONTAINER_FADE_OUT_TIME);
    }

    componentMountedAfterOpen() {
        if (!this.fsLightbox.info.isInitialized) {
            this.fsLightbox.initialize();
            return;
        }
        this.fsLightbox.core.onResize.attachListener();
        this.fsLightbox.core.onResize.adjustMediaHolderSize();
        this.fsLightbox.core.sourceHoldersTransformer.transformStageSources().withoutTimeout();
    }

    afterFadeOut() {
        this.fsLightbox.elements.container.current.classList.remove('fslightbox-fade-out-complete');
        this.fadingOut = false;
        this.documentClassList.remove('fslightbox-open');
        this.fsLightbox.setState({
            isOpen: false
        });
        this.componentMountedAfterClose();
    }

    /** @private */
    componentMountedAfterClose() {
        this.fsLightbox.core.onResize.removeListener();
    }
}