/**
 * @class
 * @param { FsLightbox.core.sourceAnimator | SourceAnimator } sourceAnimator
 * @param { FsLightbox.core.sourceHoldersTransformer | SourceHoldersTransformer } sourceHoldersTransformer
 * @param { FsLightbox.getters.getSlide | Function } getSlide
 * @param { FsLightbox.setters.setState | Function } setState
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
            sourceHoldersTransformer.transformStageSourceHolders().withTimeout();
        });
    };

    const animate = () => {
        sourceAnimator.animateSourceFromSlide(getSlide()).removeFadeIn();
        sourceAnimator.animateSourceFromSlide(getSlide()).fadeOut();
        sourceAnimator.animateSourceFromSlide(newSlideNumber).removeFadeOut();
        sourceAnimator.animateSourceFromSlide(newSlideNumber).fadeIn();
    }
}