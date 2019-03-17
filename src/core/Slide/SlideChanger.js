/**
 * @class
 * @param fsLightbox { FsLightbox }
 */
export function SlideChanger(fsLightbox) {
    let newSlideNumber;

    this.changeSlideTo = (newSlide) => {
        newSlideNumber = newSlide;
        animate();
        fsLightbox.setState({
            slide: newSlideNumber
        }, () => {
            fsLightbox.core.sourceHoldersTransformer.transformStageSources().withTimeout();
        });
    };

    const animate = () => {
        fsLightbox.core.sourceAnimator.animateSourceFromSlide(fsLightbox.state.slide).removeFadeIn();
        fsLightbox.core.sourceAnimator.animateSourceFromSlide(fsLightbox.state.slide).fadeOut();
        fsLightbox.core.sourceAnimator.animateSourceFromSlide(newSlideNumber).removeFadeOut();
        fsLightbox.core.sourceAnimator.animateSourceFromSlide(newSlideNumber).fadeIn();
    }
}