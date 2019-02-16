export class SlideChanger {
    /**
     * @param _ { FsLightbox }
     */
    constructor(_) {
        this._ = _;
        this.newSlideNumber = null;
    }

    changeSlide(newSlideNumber) {
        this.newSlideNumber = newSlideNumber;
        this.animate();
        this._.slide = newSlideNumber;
        this._.sourceHoldersTransformer.transformStageSources().withTimeout();
        this._.forceUpdate();
    }

    animate() {
        this._.sourceAnimator.animateSourceFromSlide(this._.slide)
            .fadeOut();
        this._.sourceAnimator.animateSourceFromSlide(this.newSlideNumber)
            .removeFadeOut();
        this._.sourceAnimator.animateSourceFromSlide(this.newSlideNumber)
            .fadeIn();
    }
}