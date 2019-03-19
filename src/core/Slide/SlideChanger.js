/**
 * @param { SourceAnimator }sourceAnimator
 * @param { SourceHoldersTransformer } sourceHoldersTransformer
 * @param { FsLightbox.getters.getSlide } getSlide
 * @param { FsLightbox.setters.setState } setState
 * @class
 */
export function SlideChanger(
    {
        core: { sourceAnimator, sourceHoldersTransformer },
        getters: { getSlide } ,
        setters: { setState },
    }
) {
    let newSlideNumber;

    this.changeSlideTo = (newSlide) => {
        newSlideNumber = newSlide;
        animate();
        setState({
            slide: newSlideNumber
        }, () => {
            sourceHoldersTransformer.transformStageSources().withTimeout();
        });
    };

    const animate = () => {
        sourceAnimator.animateSourceFromSlide(getSlide()).removeFadeIn();
        sourceAnimator.animateSourceFromSlide(getSlide()).fadeOut();
        sourceAnimator.animateSourceFromSlide(newSlideNumber).removeFadeOut();
        sourceAnimator.animateSourceFromSlide(newSlideNumber).fadeIn();
    }
}