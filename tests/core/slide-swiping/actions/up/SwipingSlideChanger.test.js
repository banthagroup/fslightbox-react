import { SwipingSlideChanger } from "../../../../../src/core/slide-swiping/actions/up/SwipingSlideChanger";

const fsLightbox = {
    stageIndexes: {
        previous: undefined,
        current: undefined,
        next: undefined
    },
    core: {
        sourcesHoldersTransformingFacade: {
            transform: () => {}
        }
    }
};
const swipingTransitioner = {
    addTransitionToCurrentAndPrevious: () => {},
    addTransitionToCurrentAndNext: () => {}
};
let withoutTimeout = () => {};
fsLightbox.core.sourcesHoldersTransformingFacade = {
    transform: () => ({
        withoutTimeout: withoutTimeout
    })
};

let swipingSlideChanger;

const setUp = () => {
    swipingTransitioner.addTransitionToCurrentAndPrevious = jest.fn();
    swipingTransitioner.addTransitionToCurrentAndNext = jest.fn();
    withoutTimeout = jest.fn();
    swipingSlideChanger = new SwipingSlideChanger(fsLightbox, swipingTransitioner);
};

describe('changeSlideToPrevious', () => {
    beforeAll(() => {
        fsLightbox.stageIndexes = {
            previous: 5,
            current: 10,
            next: 15
        };
        setUp();
        swipingSlideChanger.changeSlideToPrevious();
    });

    it('should set current stage index to previous', () => {
        expect(fsLightbox.stageIndexes.current).toBe(5);
    });

    it('should call without timeout', () => {
        expect(withoutTimeout).toBeCalled();
    });
});

describe('changeSlideToNext', () => {
    beforeAll(() => {
        fsLightbox.stageIndexes = {
            previous: 5,
            current: 10,
            next: 15
        };
        setUp();
        swipingSlideChanger.changeSlideToNext();
    });

    it('should set current stage index to next', () => {
        expect(fsLightbox.stageIndexes.current).toBe(15);
    });

    it('should call without timeout', () => {
        expect(withoutTimeout).toBeCalled();
    });
});
