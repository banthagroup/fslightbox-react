import { FADE_IN_ANIMATION_TIME } from "../../constants/CssConstants";

/**
 * @class
 * @param { FsLightbox.core.sourceAnimator.animateSourceFromSlide | function(): SourceAnimator } animateSourceFromSlide
 * @param { FsLightbox.core.sourceHoldersTransformer | SourceHoldersTransformer } sourceHoldersTransformer
 * @param { FsLightbox.getters.getSlide | Function } getSlide
 * @param { FsLightbox.setters.setState | Function } setState
 */
export function SlideChanger(
    {
        core: {
            sourceAnimator: { animateSourceFromSlide },
            sourceHoldersTransformer
        },
        getters: { getSlide },
        setters: { setState },
        elements: { sources }
    }
) {
    let previousSlideNumber;
    let newSlideNumber;

    this.changeSlideTo = (newSlide) => {
        previousSlideNumber = getSlide();
        newSlideNumber = newSlide;
        animateSourceHolders();
        setState({
            slide: newSlideNumber
        }, () => {
            sourceHoldersTransformer.transformStageSourceHolders().withTimeout();
        });
    };

    const animateSourceHolders = () => {
        animateSourceFromSlide(previousSlideNumber).removeFadeIn();
        animateSourceFromSlide(previousSlideNumber).fadeOut();
        animateSourceFromSlide(newSlideNumber).removeFadeOut();
        animateSourceFromSlide(newSlideNumber).fadeIn();
        setTimeout(() => {
            if (!sources[previousSlideNumber - 1].current) {
                return;
            }
            animateSourceFromSlide(previousSlideNumber).removeFadeOut();
        }, FADE_IN_ANIMATION_TIME)
    }
}