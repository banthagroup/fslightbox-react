import { FADE_IN_ANIMATION_TIME } from "../../constants/CssConstants";

/**
 * @class
 * @param { FsLightbox.core.sourceAnimator.animateSourceFromSlide | function(): SourceAnimator } animateSourceFromSlide
 * @param { FsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders
 * | function(): StageSourceHoldersTransformer } transformStageSourceHolders
 * @param { FsLightbox.getters.getSlide | Function } getSlide
 * @param { FsLightbox.setters.setState | Function } setState
 * @param { StageSources } stageSources
 */
export function SlideChanger(
    {
        core: {
            stageSources: { getPreviousSlideIndex, getNextSlideIndex },
            sourceAnimator: { animateSourceFromSlide },
            sourceHoldersTransformer: { transformStageSourceHolders }
        },
        getters: { getSlide },
        setters: { setState },
    }
) {
    let previousSlideNumber;
    let newSlideNumber;
    let wasSlideChangedDuringAnimationArray = [];

    this.changeSlideTo = (newSlide) => {
        previousSlideNumber = getSlide();
        newSlideNumber = newSlide;
        animateSourceHolders();
        setState({
            slide: newSlideNumber
        }, () => {
            transformStageSourceHolders().withTimeout();
        });
    };

    const animateSourceHolders = () => {
        animateSourceFromSlide(previousSlideNumber).removeFadeIn();
        animateSourceFromSlide(previousSlideNumber).fadeOut();
        animateSourceFromSlide(newSlideNumber).removeFadeOut();
        animateSourceFromSlide(newSlideNumber).fadeIn();
        removeFadeOutAfterFromPreviousSlideAfterTimeout();
    };

    const removeFadeOutAfterFromPreviousSlideAfterTimeout = () => {
        wasSlideChangedDuringAnimationArray.push(true);
        setTimeout(() => {
            wasSlideChangedDuringAnimationArray.pop();
            if(wasSlideChangedDuringAnimationArray.length !== 0) {
                return;
            }
            animateSourceFromSlide(getPreviousSlideIndex() + 1).removeFadeOut();
            animateSourceFromSlide(getNextSlideIndex() + 1).removeFadeOut();
        }, FADE_IN_ANIMATION_TIME);
    };
}