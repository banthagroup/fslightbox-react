import { FADE_IN_ANIMATION_TIME } from "../../constants/cssConstants";
import { TimeoutQueue } from "../timeouts/TimeoutQueue";

export function setUpSlideChanger(
    {
        componentsStates: { slide: slideState },
        injector: {
            injectDependency
        },
        core: {
            stage,
            sourceAnimator,
            sourceHoldersTransformer,
            slideChanger: self
        }
    }
) {
    let previousSlideNumber;
    let newSlideNumber;
    const previousSourceNegativeTransformQueue = injectDependency(TimeoutQueue);
    const removeFadeOutQueue = injectDependency(TimeoutQueue);

    self.changeSlideTo = (newSlide) => {
        previousSlideNumber = slideState.get();
        newSlideNumber = newSlide;
        slideState.set(newSlideNumber);
        slideState.onUpdate = () => {
            sourceHoldersTransformer.transformStageSourceHolders().withTimeout();
        };
        animateSourceHolders();
        removeFadeOutFromAllSourcesAfterTimeout();
        ifPreviousSlideIsNotInStageTransformItNegativeAfterTimeout();
    };

    const animateSourceHolders = () => {
        sourceAnimator.animateSourceFromSlide(previousSlideNumber).removeFadeIn();
        sourceAnimator.animateSourceFromSlide(previousSlideNumber).fadeOut();
        sourceAnimator.animateSourceFromSlide(newSlideNumber).removeFadeOut();
        sourceAnimator.animateSourceFromSlide(newSlideNumber).fadeIn();
    };

    const removeFadeOutFromAllSourcesAfterTimeout = () => {
        wasSlideChangedDuringAnimationArray.push(true);
        setTimeout(() => {
            wasSlideChangedDuringAnimationArray.pop();
            if (wasSlideChangedDuringAnimationArray.length === 0) {
                sourceAnimator.removeFadeOutFromAllSources();
            }
        }, FADE_IN_ANIMATION_TIME);
    };

    const ifPreviousSlideIsNotInStageTransformItNegativeAfterTimeout = () => {
        const previousSlideIndex = previousSlideNumber - 1;
        const timeoutQueue = injectDependency(TimeoutQueue);
        timeoutQueue.time = FADE_IN_ANIMATION_TIME - 30;
        timeoutQueue.condition = !stage.isSourceInStage(previousSlideIndex);
        timeoutQueue.action = () => {
            sourceHoldersTransformer.transformSourceHolderAtIndex(previousSlideIndex).negative();
        };
        timeoutQueue.startTimeout();
    };
}