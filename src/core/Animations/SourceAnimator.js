export class SourceAnimator {
    /**
     * @param _ { FsLightbox }
     */
    constructor(_) {
        this._ = _;
        this.i = null;
    }

    /**
     * @param slideNumber
     * @return { SourceAnimator }
     */
    animateSourceFromSlide(slideNumber) {
        this.i = slideNumber - 1;
        return this;
    }

    fadeOut() {
        this._.elements.sources[this.i].current.classList.add('fslightbox-fade-out-class');
    }

    fadeIn() {
        this._.elements.sources[this.i].current.classList.add('fslightbox-fade-in-class');
    }

    removeFadeOut() {
        this._.elements.sources[this.i].current.classList.remove('fslightbox-fade-out-class');
    }

    removeFadeIn() {
        this._.elements.sources[this.i].current.classList.remove('fslightbox-fade-in-class');
    }
}