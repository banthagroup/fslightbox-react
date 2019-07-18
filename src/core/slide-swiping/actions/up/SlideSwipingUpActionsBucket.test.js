import { SlideSwipingUpActionsBucket } from "./SlideSwipingUpActionsBucket";
import { SOURCES_HOLDERS } from "../../../../constants/elements";
import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../../../constants/classes-names";

const fsLightbox = {
    collections: {
        sourcesHoldersTransformers: []
    },
    core: {
        classListManager: {
            manageArrayElementAtIndex: () => ({
                add: () => {}
            })
        },
        slideIndexChanger: {
            changeTo: () => {}
        }
    },
    stageIndexes: {
        previous: undefined,
        current: undefined,
        next: undefined
    }
};

const sourcesHoldersTransformersCollection = fsLightbox.collections.sourcesHoldersTransformers;
const classListManager = fsLightbox.core.classListManager;
const slideIndexChanger = fsLightbox.core.slideIndexChanger;

let slideSwipingUpActionsBucket;

test('changeSlideToPrevious', () => {
    fsLightbox.stageIndexes = {
        previous: 5,
        current: 6
    };
    const addClassToPreviousSlideSource = jest.fn();
    const addClassToNewSlideSource = jest.fn();
    classListManager.manageArrayElementAtIndex = (elementsArrayName, index) => {
        if (elementsArrayName !== SOURCES_HOLDERS) {
            return;
        }
        if (index === 6) {
            return {
                add: addClassToPreviousSlideSource
            }
        }
        if (index === 5) {
            return {
                add: addClassToNewSlideSource
            }
        }
    };

    slideIndexChanger.changeTo = (newCurrentIndex) => {
        if (newCurrentIndex === 5) {
            fsLightbox.stageIndexes.current = 5;
        }
    };

    sourcesHoldersTransformersCollection[6] = {
        positive: jest.fn()
    };
    sourcesHoldersTransformersCollection[5] = {
        zero: jest.fn()
    };

    slideSwipingUpActionsBucket = new SlideSwipingUpActionsBucket(fsLightbox);
    slideSwipingUpActionsBucket.changeSlideToPrevious();

    expect(addClassToPreviousSlideSource).toBeCalledWith(TRANSFORM_TRANSITION_CLASS_NAME);
    expect(addClassToNewSlideSource).toBeCalledWith(TRANSFORM_TRANSITION_CLASS_NAME);
    expect(sourcesHoldersTransformersCollection[6].positive).toBeCalled();
    expect(sourcesHoldersTransformersCollection[5].zero).toBeCalled();
});

test('changeSlideToNext', () => {
    fsLightbox.stageIndexes = {
        current: 3,
        next: 4
    };

    const addClassToPreviousSlideSource = jest.fn();
    const addClassToNewSlideSource = jest.fn();
    classListManager.manageArrayElementAtIndex = (elementsArrayName, index) => {
        if (elementsArrayName !== SOURCES_HOLDERS) {
            return;
        }
        if (index === 3) {
            return {
                add: addClassToPreviousSlideSource
            }
        }
        if (index === 4) {
            return {
                add: addClassToNewSlideSource
            }
        }
    };

    slideIndexChanger.changeTo = (newCurrentIndex) => {
        if (newCurrentIndex === 4) {
            fsLightbox.stageIndexes.current = 4;
        }
    };

    sourcesHoldersTransformersCollection[3] = {
        negative: jest.fn()
    };
    sourcesHoldersTransformersCollection[4] = {
        zero: jest.fn()
    };

    slideSwipingUpActionsBucket = new SlideSwipingUpActionsBucket(fsLightbox);
    slideSwipingUpActionsBucket.changeSlideToNext();

    expect(addClassToPreviousSlideSource).toBeCalledWith(TRANSFORM_TRANSITION_CLASS_NAME);
    expect(addClassToNewSlideSource).toBeCalledWith(TRANSFORM_TRANSITION_CLASS_NAME);
    expect(sourcesHoldersTransformersCollection[3].negative).toBeCalled();
    expect(sourcesHoldersTransformersCollection[4].zero).toBeCalled();
});

test('addTransitionAndTransformZeroCurrentSource', () => {
    fsLightbox.stageIndexes.current = 10;
    const addClass = jest.fn();
    classListManager.manageArrayElementAtIndex = (elementsArrayName, index) => {
        if (elementsArrayName === SOURCES_HOLDERS && index === 10) {
            return {
                add: addClass
            }
        }
    };
    sourcesHoldersTransformersCollection[10] = {
        zero: jest.fn()
    };
    slideSwipingUpActionsBucket = new SlideSwipingUpActionsBucket(fsLightbox);
    slideSwipingUpActionsBucket.addTransitionAndTransformZeroCurrentSlideSource();

    expect(addClass).toBeCalledWith(TRANSFORM_TRANSITION_CLASS_NAME);
    expect(sourcesHoldersTransformersCollection[10].zero).toBeCalled();
});
