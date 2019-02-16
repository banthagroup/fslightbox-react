import { CONTAINER_FADE_OUT_TIME } from "../constants/CoreConstants";

export default class CloseOpenLightbox {
    /**
     * @param _ { FsLightbox }
     */
    constructor(_) {
        this._ = _;
        this.documentClassList = document.documentElement.classList;
        this.fadingOut = false;
        this.closeLightbox = this.closeLightbox.bind(this);
        this.componentMountedAfterOpen = this.componentMountedAfterOpen.bind(this);
        this.componentMountedAfterClose = this.componentMountedAfterClose.bind(this);
    }

    openLightbox() {
        this._.setState({
            isOpen: true
        }, this.componentMountedAfterOpen);
        this.addOpeningClassToDocument();
    }

    addOpeningClassToDocument() {
        this.documentClassList.add('fslightbox-open');
    }

    componentMountedAfterOpen() {
        if (!this._.initialized) {
            this._.initialize();
            return;
        }
        this._.onResize.attachListener();
        this._.onResize.adjustMediaHolderSize();
    }



    closeLightbox() {
        if (this.fadingOut) return;
        this.fadingOut = true;
        this._.elements.container.current.classList.add('fslightbox-fade-out-complete');

        setTimeout(() => {
            this._.elements.container.current.classList.remove('fslightbox-fade-out-complete');
            this.fadingOut = false;
            this.documentClassList.remove('fslightbox-open');
            this._.setState({
                isOpen: false
            }, this.componentMountedAfterClose);
        }, CONTAINER_FADE_OUT_TIME);
    }

    componentMountedAfterClose() {
        this._.onResize.removeListener();
    }
}