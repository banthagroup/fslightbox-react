import { SlideSwipingUpActionsBucket } from "../../../../../src/core/slide-swiping/actions/up/SlideSwipingUpActionsBucket";
import { SOURCES_HOLDERS } from "../../../../../src/constants/elements";
import { TRANSFORM_TRANSITION_CLASS_NAME } from "../../../../../src/constants/classes-names";
import { getMountedImageForFsLightboxInstance } from "../../../../__mocks__/helpers/getMountedImageForFsLightboxInstance";

const fsLightbox = {
    collections: {
        sourcesHoldersTransformers: []
    },
    core: {
        classListManager: {
            addToElementInArrayAtIndexClass: () => {}

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
    beforeAll(() => {
        fsLightbox.stageIndexes = {
            previous: 5,
            current: 6
        };

        classListManager.addToElementInArrayAtIndexClass = jest.fn();

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
        expect(classListManager.addToElementInArrayAtIndexClass).toBeCalledWith(
            SOURCES_HOLDERS,
            6,
            TRANSFORM_TRANSITION_CLASS_NAME
        );
    });

    it('should add to new slide source holder transition class', () => {
        expect(classListManager.addToElementInArrayAtIndexClass).toBeCalledWith(
            SOURCES_HOLDERS,
            5,
            TRANSFORM_TRANSITION_CLASS_NAME
        );
    });

    it('should transform previous slide source holder positive', () => {
        expect(sourcesHoldersTransformersCollection[6].positive).toBeCalled();
    });

    it('should transform new slide source holder zero', () => {
        expect(sourcesHoldersTransformersCollection[5].zero).toBeCalled();
    });
});

describe('changeSlideToNext', () => {
    beforeAll(() => {
        fsLightbox.stageIndexes = {
            current: 3,
            next: 4
        };

        classListManager.addToElementInArrayAtIndexClass = jest.fn();

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
        expect(classListManager.addToElementInArrayAtIndexClass).toBeCalledWith(
            SOURCES_HOLDERS,
            3,
            TRANSFORM_TRANSITION_CLASS_NAME
        );
    });

    it('should add to new slide source holder transition class', () => {
        expect(classListManager.addToElementInArrayAtIndexClass).toBeCalledWith(
            SOURCES_HOLDERS,
            4,
            TRANSFORM_TRANSITION_CLASS_NAME
        );
    });

    it('should transform previous slide source holder negative', () => {
        expect(sourcesHoldersTransformersCollection[3].negative).toBeCalled();
    });

    it('should transform new slide source holder zero', () => {
        expect(sourcesHoldersTransformersCollection[4].zero).toBeCalled();
    });
});

describe('addTransitionAndTransformZeroCurrentSource', () => {
    beforeAll(() => {
        fsLightbox.stageIndexes.current = 10;
        classListManager.addToElementInArrayAtIndexClass = jest.fn();
        sourcesHoldersTransformersCollection[10] = {
            zero: jest.fn()
        };
        slideSwipingUpActionsBucket = new SlideSwipingUpActionsBucket(fsLightbox);
        slideSwipingUpActionsBucket.addTransitionAndTransformZeroCurrentSource();
    });

    it('should add transition to current source holder', () => {
        expect(classListManager.addToElementInArrayAtIndexClass).toBeCalledWith(
            SOURCES_HOLDERS,
            10,
            TRANSFORM_TRANSITION_CLASS_NAME
        );
    });

    it('should transform zero current source holder', () => {
        expect(sourcesHoldersTransformersCollection[10].zero).toBeCalled();
    });
});
