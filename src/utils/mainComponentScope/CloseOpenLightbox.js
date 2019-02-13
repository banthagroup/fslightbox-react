import { CONTAINER_FADE_OUT_TIME } from "../../constants/CoreConstants";

export class CloseOpenLightbox {
    /**
     * @param fsLightbox { FsLightbox }
     */
    constructor(fsLightbox) {
        this.fsLightbox = fsLightbox;
        this.documentClassList = document.documentElement.classList;
        this.fadingOut = false;
        this.closeLightbox = this.closeLightbox.bind(this);
        this.componentMountedAfterOpen = this.componentMountedAfterOpen.bind(this);
        this.componentMountedAfterClose = this.componentMountedAfterClose.bind(this);
    }

    openLightbox() {
        this.fsLightbox.setState({
            isOpen: true
        }, this.componentMountedAfterOpen);
        this.addOpeningClassToDocument();
    }

    addOpeningClassToDocument() {
        this.documentClassList.add('fslightbox-open');
    }

    componentMountedAfterOpen() {
        if (!this.fsLightbox.initialized) {
            this.fsLightbox.initialize();
            return;
        }
        this.fsLightbox.onResize.attachListener();
        this.fsLightbox.onResize.adjustMediaHolderSize();
    }



    closeLightbox() {
        if (this.fadingOut) return;
        this.fadingOut = true;
        this.fsLightbox.elements.container.current.classList.add('fslightbox-fade-out-animation');

        setTimeout(() => {
            this.fsLightbox.elements.container.current.classList.remove('fslightbox-fade-out-animation');
            this.fadingOut = false;
            this.documentClassList.remove('fslightbox-open');
            this.fsLightbox.setState({
                isOpen: false
            }, this.componentMountedAfterClose);
        }, CONTAINER_FADE_OUT_TIME);
    }

    componentMountedAfterClose() {
        this.fsLightbox.onResize.removeListener();
    }
}