import { ANIMATION_TIME } from "../../constants/css-constants";
import { SOURCE_ANIMATION_WRAPPERS, SOURCE_MAIN_WRAPPERS } from "../../constants/elements";
import {
    FADE_IN_CLASS_NAME, FADE_IN_STRONG_CLASS_NAME,
    FADE_OUT_CLASS_NAME,
    TRANSFORM_TRANSITION_CLASS_NAME,
} from "../../constants/classes-names";
import { removeFromElementClassIfContains } from "../../helpers/elements/removeFromElementClassIfContains";

export function setUpSlideIndexChanger(
    {
        collections: { sourceMainWrapperTransformers },
        componentsServices,
        core: { classFacade, slideIndexChanger: self, sourceDisplayFacade, stageManager },
        elements: { sourceAnimationWrappers },
        getQueuedAction,
        stageIndexes,
        timeout
    }
) {
    const runQueuedRemoveFadeOut = getQueuedAction(() => {
        classFacade.removeFromEachElementClassIfContains(SOURCE_ANIMATION_WRAPPERS, FADE_OUT_CLASS_NAME);
    }, ANIMATION_TIME);

    self.changeTo = (i) => {
        stageIndexes.current = i;
        stageManager.updateStageIndexes();
        componentsServices.setSlideNumber(i + 1);
        sourceDisplayFacade.displaySourcesWhichShouldBeDisplayed();
    };

    self.jumpTo = (i) => {
        let previousI = stageIndexes.current;
        self.changeTo(i);

        classFacade.removeFromEachElementClassIfContains(SOURCE_MAIN_WRAPPERS, TRANSFORM_TRANSITION_CLASS_NAME);

        removeFromElementClassIfContains(sourceAnimationWrappers[previousI], FADE_IN_STRONG_CLASS_NAME);
        removeFromElementClassIfContains(sourceAnimationWrappers[previousI], FADE_IN_CLASS_NAME);
        sourceAnimationWrappers[previousI].current.classList.add(FADE_OUT_CLASS_NAME);

        removeFromElementClassIfContains(sourceAnimationWrappers[i], FADE_IN_STRONG_CLASS_NAME);
        removeFromElementClassIfContains(sourceAnimationWrappers[i], FADE_OUT_CLASS_NAME);
        sourceAnimationWrappers[i].current.classList.add(FADE_IN_CLASS_NAME);

        // we need to remove fade out from all sources because if someone used slide swiping during animation timeout
        // we cannot detect what slide will be
        runQueuedRemoveFadeOut();

        sourceMainWrapperTransformers[i].zero();

        timeout(() => {
            if (previousI !== stageIndexes.current) {
                sourceMainWrapperTransformers[previousI].negative();
            }
        }, ANIMATION_TIME - 30);
    };
}
