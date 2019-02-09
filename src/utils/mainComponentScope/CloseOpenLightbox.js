export class CloseOpenLightbox {
    /**
     * @param fsLightbox { FsLightbox }
     */
    constructor(fsLightbox) {
        this.fsLightbox = fsLightbox;
        this.documentClassList = document.documentElement.classList;
        this.closeLightbox = this.closeLightbox.bind(this);
        this.componentMountedAfterOpen = this.componentMountedAfterOpen.bind(this);
        this.componentMountedAfterClose = this.componentMountedAfterClose.bind(this);
    }

    openLightbox() {
        this.fsLightbox.setState({
            isOpen: true
        }, this.componentMountedAfterOpen);
        this.documentClassList.add('fslightbox-open');
    }

    componentMountedAfterOpen() {
        if (!this.fsLightbox.initialized) {
            this.fsLightbox.initialize();
            return;
        }
        this.fsLightbox.onResize.attachListener();
        this.fsLightbox.onResize.scaleMediaHolder();
    }



    closeLightbox() {
        this.fsLightbox.setState({
            isOpen: false
        }, this.componentMountedAfterClose);
        this.documentClassList.remove('fslightbox-open');
    }

    componentMountedAfterClose() {
        this.fsLightbox.onResize.removeListener()
    }
}