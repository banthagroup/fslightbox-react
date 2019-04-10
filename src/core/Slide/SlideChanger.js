import { FADE_IN_ANIMATION_TIME } from "../../constants/CssConstants";

/**
 * @class
 * @param { FsLightbox.core.sourceAnimator.animateSourceFromSlide | function(): SourceAnimator } animateSourceFromSlide
 * @param { FsLightbox.core.sourceAnimator.removeFadeOutFromAllSources | Function } removeFadeOutFromAllSources
 * @param { FsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders
 * | function(): StageSourceHoldersTransformer } transformStageSourceHolders
 * @param { StageSources } stageSources
 */
export function SlideChanger(
    {
        core: {
            sourceAnimator: { animateSourceFromSlide, removeFadeOutFromAllSources },
            sourceHoldersTransformer: { transformStageSourceHolders }
        },
        componentsStates: { slide: slideState },
    }
) {
    let previousSlideNumber;
    let newSlideNumber;
    let wasSlideChangedDuringAnimationArray = [];

    this.changeSlideTo = (newSlide) => {
        previousSlideNumber = slideState.get();
        newSlideNumber = newSlide;
        animateSourceHolders();
        slideState.set(newSlideNumber);
        slideState.onUpdate = () => {
            transformStageSourceHolders().withTimeout();
        };
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
            if (wasSlideChangedDuringAnimationArray.length !== 0) {
                return;
            }
            removeFadeOutFromAllSources();
        }, FADE_IN_ANIMATION_TIME);
    };
}