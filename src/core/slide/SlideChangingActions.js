import { getRemoveFadeOutTimeoutQueue } from "./getRemoveFadeOutTimeoutQueue";
import { getPreviousSourceNegativeTransformTimeoutQueue } from "./getPreviousSourceNegativeTransformTimeoutQueue";

/**
 * @constructor
 */
export function SlideChangingActions(fsLightbox) {
    const {
        componentsStates: { slide: slideState },
        core: {
            stage,
            sourceAnimator,
            sourcesHoldersTransformer,
            slideChanger: self
        }
    } = fsLightbox;
    const removeFadeOutQueue = getRemoveFadeOutTimeoutQueue(fsLightbox);
    const previousSourceNegativeTransformQueue = getPreviousSourceNegativeTransformTimeoutQueue(fsLightbox);
    let previousSlideNumber;
    let newSlideNumber;

    self.changeSlideTo = (newSlide) => {
        previousSlideNumber = slideState.get();
        newSlideNumber = newSlide;
        slideState.set(newSlideNumber);
        slideState.onUpdate = () => {
            sourcesHoldersTransformer.transform().withTimeout();
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
        removeFadeOutQueue.startTimeout();
    };

    const ifPreviousSlideIsNotInStageTransformItNegativeAfterTimeout = () => {
        const previousSlideIndex = previousSlideNumber - 1;
        previousSourceNegativeTransformQueue.actionCallConditionFunc = () => !stage.isSourceInStage(previousSlideIndex);
        previousSourceNegativeTransformQueue.action = () => {
            sourcesHoldersTransformer.transformSourceHolderAtIndex(previousSlideIndex).negative();
        };
        previousSourceNegativeTransformQueue.startTimeout();
    };
}
