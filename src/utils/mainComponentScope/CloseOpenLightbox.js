export class CloseOpenLightbox {
    constructor(fsLightbox) {
        this.fsLightbox = fsLightbox;
        this.documentClassList = document.documentElement.classList;
        this.closeLightbox = this.closeLightbox.bind(this);
    }

    openLightbox() {
        this.fsLightbox.setState({
            isOpen: true
        });
        this.documentClassList.add('fslightbox-open');
    }

    closeLightbox() {
        this.fsLightbox.setState({
            isOpen: false
        });
        this.documentClassList.remove('fslightbox-open');
    }
}