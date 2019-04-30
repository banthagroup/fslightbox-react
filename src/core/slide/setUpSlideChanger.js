import { FADE_IN_ANIMATION_TIME } from "../../constants/cssConstants";

export function setUpSlideChanger(
    {
        componentsStates: { slide: slideState },
        core: {
            sourceAnimator,
            sourceHoldersTransformer,
            slideChanger: self
        }
    }
) {
    let previousSlideNumber;
    let newSlideNumber;
    let wasSlideChangedDuringAnimationArray = [];

    self.changeSlideTo = (newSlide) => {
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