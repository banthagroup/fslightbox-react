import { setUpSlideIndexChanger } from "./setUpSlideIndexChanger";
import { ANIMATION_TIME } from "../../constants/css-constants";
import { SOURCE_ANIMATION_WRAPPERS, SOURCE_MAIN_WRAPPERS } from "../../constants/elements";
import {
    FADE_IN_CLASS_NAME,
    FADE_IN_STRONG_CLASS_NAME,
    FADE_OUT_CLASS_NAME,
    TRANSFORM_TRANSITION_CLASS_NAME
} from "../../constants/classes-names";
import * as removeFromElementClassIfContainsObject from "../../helpers/elements/removeFromElementClassIfContains";

const fsLightbox = {
    collections: { sourceMainWrapperTransformers: [{ negative: jest.fn() }, { zero: jest.fn() }] },
    componentsServices: {
        setSlideNumber: jest.fn(),
        displaySourceIfNotYetCollection: [jest.fn(), jest.fn()]
    },
    core: {
        classFacade: { removeFromEachElementClassIfContains: jest.fn() },
        slideIndexChanger: {},
        sourceDisplayFacade: { displaySourcesWhichShouldBeDisplayed: jest.fn() },
        stageManager: { updateStageIndexes: jest.fn(), }
    },
    elements: {
        sourceAnimationWrappers: [
            { current: { classList: { add: jest.fn() } } },
            { current: { classList: { add: jest.fn() } } }
        ]
    },
    getQueuedAction: jest.fn(() => runQueuedRemoveFadeOut),
    stageIndexes: {},
    timeout: jest.fn()
};

const runQueuedRemoveFadeOut = jest.fn();
const slideIndexChanger = fsLightbox.core.slideIndexChanger;
setUpSlideIndexChanger(fsLightbox);

test('removeFadeOutQueue', () => {
    expect(fsLightbox.getQueuedAction.mock.calls[0][1]).toBe(ANIMATION_TIME);
    fsLightbox.getQueuedAction.mock.calls[0][0]();
    expect(fsLightbox.core.classFacade.removeFromEachElementClassIfContains).toBeCalledWith(
        SOURCE_ANIMATION_WRAPPERS, FADE_OUT_CLASS_NAME
    );
});

test('changeTo', () => {
    slideIndexChanger.changeTo(1);
    expect(fsLightbox.stageIndexes.current).toBe(1);
    expect(fsLightbox.core.stageManager.updateStageIndexes).toBeCalled();
    expect(fsLightbox.componentsServices.setSlideNumber).toBeCalledWith(2);
    expect(fsLightbox.core.sourceDisplayFacade.displaySourcesWhichShouldBeDisplayed).toBeCalled();
});

test('jumpTo', () => {
    fsLightbox.stageIndexes.current = 0;
    removeFromElementClassIfContainsObject.removeFromElementClassIfContains = jest.fn();
    slideIndexChanger.changeTo = jest.fn();
    slideIndexChanger.jumpTo(1);
    expect(slideIndexChanger.changeTo).toBeCalledWith(1);
    expect(fsLightbox.core.classFacade.removeFromEachElementClassIfContains).toBeCalledWith(
        SOURCE_MAIN_WRAPPERS, TRANSFORM_TRANSITION_CLASS_NAME
    );
    expect(removeFromElementClassIfContainsObject.removeFromElementClassIfContains).toBeCalledWith(
        fsLightbox.elements.sourceAnimationWrappers[0], FADE_IN_STRONG_CLASS_NAME
    );
    expect(removeFromElementClassIfContainsObject.removeFromElementClassIfContains).toBeCalledWith(
        fsLightbox.elements.sourceAnimationWrappers[0], FADE_IN_CLASS_NAME
    );

    expect(fsLightbox.elements.sourceAnimationWrappers[0].current.classList.add).toBeCalledWith(FADE_OUT_CLASS_NAME);
    expect(removeFromElementClassIfContainsObject.removeFromElementClassIfContains).toBeCalledWith(
        fsLightbox.elements.sourceAnimationWrappers[1], FADE_IN_STRONG_CLASS_NAME
    );
    expect(removeFromElementClassIfContainsObject.removeFromElementClassIfContains).toBeCalledWith(
        fsLightbox.elements.sourceAnimationWrappers[1], FADE_OUT_CLASS_NAME
    );
    expect(fsLightbox.elements.sourceAnimationWrappers[1].current.classList.add).toBeCalledWith(FADE_IN_CLASS_NAME);
    expect(fsLightbox.collections.sourceMainWrapperTransformers[1].zero).toBeCalled();
    expect(runQueuedRemoveFadeOut).toBeCalled()
    expect(fsLightbox.collections.sourceMainWrapperTransformers[0].negative).not.toBeCalled();
    expect(fsLightbox.timeout.mock.calls[0][1]).toBe(ANIMATION_TIME - 30);
    fsLightbox.timeout.mock.calls[0][0]();
    expect(fsLightbox.collections.sourceMainWrapperTransformers[0].negative).not.toBeCalled();
    fsLightbox.stageIndexes.current = 1;
    fsLightbox.timeout.mock.calls[0][0]();
    expect(fsLightbox.collections.sourceMainWrapperTransformers[0].negative).toBeCalled();
});
