/**
 * @class
 * @param { FsLightbox.core.sourceAnimator | SourceAnimator } sourceAnimator
 * @param { FsLightbox.core.sourceHoldersTransformer | SourceHoldersTransformer } sourceHoldersTransformer
 * @param { FsLightbox.getters.getSlide | Function } getSlide
 * @param { FsLightbox.setters.setState | Function } setState
 */
export function SlideChanger(
    {
        elements: { sources },
        core: { sourceAnimator, sourceHoldersTransformer },
        getters: { getSlide },
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
        let previousSlide = getSlide();
        sourceAnimator.animateSourceFromSlide(previousSlide).removeFadeIn();
        sourceAnimator.animateSourceFromSlide(previousSlide).fadeOut();
        sourceAnimator.animateSourceFromSlide(newSlideNumber).removeFadeOut();
        sourceAnimator.animateSourceFromSlide(newSlideNumber).fadeIn();
        setTimeout(() => {
            sourceAnimator.animateSourceFromSlide(previousSlide).removeFadeOut();
            // sources[previousSlide - 1].current.style.opacity = '1';
        }, 250)
    }
}