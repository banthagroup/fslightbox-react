import { SlideSwipingUpActionsBucket } from "../../../../../src/core/slide-swiping/actions/up/SlideSwipingUpActionsBucket";
import { SOURCES_HOLDERS } from "../../../../../src/constants/elements";
import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../../../../src/constants/classes-names";

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

describe('changeSlideToPrevious', () => {
    let addClassToPreviousSlideSource;
    let addClassToNewSlideSource;

    beforeAll(() => {
        fsLightbox.stageIndexes = {
            previous: 5,
            current: 6
        };

        addClassToPreviousSlideSource = jest.fn();
        addClassToNewSlideSource = jest.fn();
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
    });

    it('should add to previous slide source holder transition class', () => {
        expect(addClassToPreviousSlideSource).toBeCalledWith(TRANSFORM_TRANSITION_CLASS_NAME);
    });

    it('should add to new slide source holder transition class', () => {
        expect(addClassToNewSlideSource).toBeCalledWith(TRANSFORM_TRANSITION_CLASS_NAME);
    });

    it('should transform previous slide source holder positive', () => {
        expect(sourcesHoldersTransformersCollection[6].positive).toBeCalled();
    });

    it('should transform new slide source holder zero', () => {
        expect(sourcesHoldersTransformersCollection[5].zero).toBeCalled();
    });
});

describe('changeSlideToNext', () => {
    let addClassToPreviousSlideSource;
    let addClassToNewSlideSource;

    beforeAll(() => {
        fsLightbox.stageIndexes = {
            current: 3,
            next: 4
        };


        addClassToPreviousSlideSource = jest.fn();
        addClassToNewSlideSource = jest.fn();
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
    });

    it('should add to previous slide source holder transition class', () => {
        expect(addClassToPreviousSlideSource).toBeCalledWith(TRANSFORM_TRANSITION_CLASS_NAME);
    });

    it('should add to new slide source holder transition class', () => {
        expect(addClassToNewSlideSource).toBeCalledWith(TRANSFORM_TRANSITION_CLASS_NAME);
    });

    it('should transform previous slide source holder negative', () => {
        expect(sourcesHoldersTransformersCollection[3].negative).toBeCalled();
    });

    it('should transform new slide source holder zero', () => {
        expect(sourcesHoldersTransformersCollection[4].zero).toBeCalled();
    });
});

describe('addTransitionAndTransformZeroCurrentSource', () => {
    let addClass;

    beforeAll(() => {
        fsLightbox.stageIndexes.current = 10;
        addClass = jest.fn();
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
    });

    it('should add transition to current source holder', () => {
        expect(addClass).toBeCalledWith(TRANSFORM_TRANSITION_CLASS_NAME);
    });

    it('should transform zero current source holder', () => {
        expect(sourcesHoldersTransformersCollection[10].zero).toBeCalled();
    });
});
