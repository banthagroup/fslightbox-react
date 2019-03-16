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
        fsLightbox.sourceAnimator.animateSourceFromSlide(fsLightbox.state.slide).removeFadeIn();
        fsLightbox.sourceAnimator.animateSourceFromSlide(fsLightbox.state.slide).fadeOut();
        fsLightbox.sourceAnimator.animateSourceFromSlide(newSlideNumber).removeFadeOut();
        fsLightbox.sourceAnimator.animateSourceFromSlide(newSlideNumber).fadeIn();
    }
}