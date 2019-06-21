import { TimeoutQueue } from "../timeouts/TimeoutQueue";
import { ANIMATION_TIME } from "../../constants/css-constants";

export function setUpSlideIndexChanger(
    {
        stageIndexes,
        collections: {
            sourcesHoldersTransformers
        },
        core: {
            slideIndexChanger: self,
            slideNumberUpdater,
            sourceAnimator,
            stageManager
        },
        injector: {
            injectDependency
        },
    }
) {
    const removeFadeOutQueue = injectDependency(TimeoutQueue);
    removeFadeOutQueue.time = ANIMATION_TIME;
    removeFadeOutQueue.action = () => {
        sourceAnimator.removeFadeOutFromAllSources();
    };

    self.changeTo = (index) => {
        stageIndexes.current = index;
        stageManager.updateStageIndexes();
        slideNumberUpdater.updateSlideNumber();
    };

    self.changeToWithActions = (index) => {
        let previousSlideIndex = stageIndexes.current;
        self.changeTo(index);

        sourcesHoldersTransformers[index].zero();
        setTimeout(() => {
            if (previousSlideIndex !== stageIndexes.current)
                sourcesHoldersTransformers[previousSlideIndex].negative();
        }, ANIMATION_TIME);

        const previousSlideSourceAnimator = sourceAnimator.animateSourceFromIndex(previousSlideIndex);
        previousSlideSourceAnimator.removeFadeIn();
        previousSlideSourceAnimator.fadeOut();

        const newSlideSourceAnimator = sourceAnimator.animateSourceFromIndex(index);
        newSlideSourceAnimator.removeFadeOut();
        newSlideSourceAnimator.fadeIn();

        // we need to remove fade out from all sources because if someone used slide swiping during animation timeout
        // we cannot detect what slide will be
        removeFadeOutQueue.startTimeout();
    };
}
