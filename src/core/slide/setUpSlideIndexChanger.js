import { TimeoutQueue } from "../timeouts/TimeoutQueue";
import { ANIMATION_TIME } from "../../constants/css-constants";
import { SOURCES } from "../../constants/elements";
import {
    FADE_IN_CLASS_NAME,
    FADE_OUT_CLASS_NAME,
    LONG_FADE_IN_CLASS_NAME,
} from "../../constants/classes-names";

export function setUpSlideIndexChanger(
    {
        collections: {
            sourcesHoldersTransformers
        },
        componentsStates: {
            slideNumberUpdater: slideNumberUpdaterState
        },
        core: {
            classListManager,
            slideIndexChanger: self,
            stageManager
        },
        data: {
            sourcesCount
        },
        injector: {
            resolve
        },
        stageIndexes
    }
) {
    const removeFadeOutQueue = resolve(TimeoutQueue);
    removeFadeOutQueue.time = ANIMATION_TIME;
    removeFadeOutQueue.action = () => {
        for (let i = 0; i < sourcesCount; i++) {
            classListManager
                .manageArrayElementAtIndex(SOURCES, i)
                .removeIfContains(FADE_OUT_CLASS_NAME);
        }
    };

    self.changeTo = (index) => {
        stageIndexes.current = index;
        stageManager.updateStageIndexes();
        slideNumberUpdaterState.set(!slideNumberUpdaterState.get());
    };

    self.changeToWithActions = (index) => {
        let previousSlideIndex = stageIndexes.current;
        self.changeTo(index);

        const previousSlideSourceClassManager = classListManager.manageArrayElementAtIndex(SOURCES, previousSlideIndex);
        previousSlideSourceClassManager.removeIfContains(FADE_IN_CLASS_NAME);
        previousSlideSourceClassManager.removeIfContains(LONG_FADE_IN_CLASS_NAME);
        previousSlideSourceClassManager.add(FADE_OUT_CLASS_NAME);

        const newSlideSourceClassManager = classListManager.manageArrayElementAtIndex(SOURCES, index);
        newSlideSourceClassManager.removeIfContains(FADE_OUT_CLASS_NAME);
        newSlideSourceClassManager.add(FADE_IN_CLASS_NAME);

        // we need to remove fade out from all sources because if someone used slide swiping during animation timeout
        // we cannot detect what slide will be
        removeFadeOutQueue.startTimeout();

        sourcesHoldersTransformers[index].zero();
        setTimeout(() => {
            if (previousSlideIndex !== stageIndexes.current)
                sourcesHoldersTransformers[previousSlideIndex].negative();
        }, ANIMATION_TIME);
    };
}
