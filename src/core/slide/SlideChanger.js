import { FADE_IN_ANIMATION_TIME } from "../../constants/cssConstants";

/**
 * @constructor
 * @param { FsLightbox.componentsStates.slide | { set: function(boolean), get: function(): boolean, onUpdate: function } } slideState
 * @param { FsLightbox.core.sourceAnimator | SourceAnimator } sourceAnimator
 * @param { FsLightbox.core.sourceAnimator.removeFadeOutFromAllSources | Function } removeFadeOutFromAllSources
 * @param { FsLightbox.core.sourceHoldersTransformer | SourceHoldersTransformer} sourceHoldersTransformer
 */
export function SlideChanger(
    {
        componentsStates: { slide: slideState },
        core: {
            sourceAnimator,
            sourceHoldersTransformer,
        }
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
            sourceHoldersTransformer.transformStageSourceHolders().withTimeout();
        };
    };

    const animateSourceHolders = () => {
        sourceAnimator.animateSourceFromSlide(previousSlideNumber).removeFadeIn();
        sourceAnimator.animateSourceFromSlide(previousSlideNumber).fadeOut();
        sourceAnimator.animateSourceFromSlide(newSlideNumber).removeFadeOut();
        sourceAnimator.animateSourceFromSlide(newSlideNumber).fadeIn();
        removeFadeOutFromAllSourcesAfterTimeout();
    };

    const removeFadeOutFromAllSourcesAfterTimeout = () => {
        wasSlideChangedDuringAnimationArray.push(true);
        setTimeout(() => {
            wasSlideChangedDuringAnimationArray.pop();
            if (wasSlideChangedDuringAnimationArray.length !== 0) {
                return;
            }
            sourceAnimator.removeFadeOutFromAllSources();
        }, FADE_IN_ANIMATION_TIME);
    };
}