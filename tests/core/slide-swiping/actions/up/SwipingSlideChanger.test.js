import { SwipingSlideChanger } from "../../../../../src/core/slide-swiping/actions/up/SwipingSlideChanger";

const fsLightbox = {
    componentsStates: {
        slide: {
            set: () => {},
            onUpdate: () => {},
        }
    },
    core: {
        sourcesHoldersTransformer: {
            transform: () => {},
        }
    }
};
const swipingTransitioner = {
    addTransitionToCurrentAndPrevious: () => {},
    addTransitionToCurrentAndNext: () => {}
};
const stageSourcesIndexes = {
    previous: null,
    current: null,
    next: null
};

/** @var { SwipingSlideChanger } swipingSlideChanger */
let swipingSlideChanger;


const recreateSwipingSlideChangerAndCallChangeSlideToPrevious = () => {
    recreateSwipingSlideChanger();
    swipingSlideChanger.changeSlideToPrevious();
};

const recreateSwipingSlideChangerAndCallChangeSlideToNext = () => {
    recreateSwipingSlideChanger();
    swipingSlideChanger.changeSlideToNext();
};

const recreateSwipingSlideChanger = () => {
    swipingSlideChanger = new SwipingSlideChanger(fsLightbox, swipingTransitioner);
    swipingSlideChanger.setStageSourcesIndexes(stageSourcesIndexes);
};

describe('changeSlideToPrevious', () => {
    describe('changing slide to previous', () => {
        beforeAll(() => {
            stageSourcesIndexes.previous = 1;
            fsLightbox.componentsStates.slide.set = jest.fn();
            recreateSwipingSlideChangerAndCallChangeSlideToPrevious();
        });

        it('should call setSlide with previous slide number (index is 1 so slide number - 2)', () => {
            expect(fsLightbox.componentsStates.slide.set).toBeCalled();
        });
    });

    describe('on components update transforming stage source holders without timeout', () => {
        let withoutTimeout;

        beforeAll(() => {
            withoutTimeout = jest.fn();
            fsLightbox.core.sourcesHoldersTransformer.transform = jest.fn(() => ({
                withoutTimeout: withoutTimeout
            }));
            recreateSwipingSlideChangerAndCallChangeSlideToPrevious();
            // simulating onUpdate (in runtime it will be called by React)
            fsLightbox.componentsStates.slide.onUpdate();
        });

        it('should call transform', () => {
            expect(fsLightbox.core.sourcesHoldersTransformer.transform).toBeCalled();
        });

        it('should call withoutTimeout', () => {
            expect(withoutTimeout).toBeCalled();
        });
    });

    describe('adding transition to current and previous source holder', () => {
        beforeAll(() => {
            swipingTransitioner.addTransitionToCurrentAndPrevious = jest.fn();
            recreateSwipingSlideChangerAndCallChangeSlideToPrevious();
        });

        it('should call addTransitionToCurrentAndPrevious from SwipingTransitioner', () => {
            expect(swipingTransitioner.addTransitionToCurrentAndPrevious).toBeCalled();
        });
    });
});


describe('changeSlideToNext', () => {
    describe('changing slide to next', () => {
        beforeAll(() => {
            stageSourcesIndexes.next = 1;
            fsLightbox.componentsStates.slide.set = jest.fn();
            recreateSwipingSlideChangerAndCallChangeSlideToNext();
        });

        it('should call setSlide with next slide number (index is 1 so slide number - 2)', () => {
            expect(fsLightbox.componentsStates.slide.set).toBeCalled();
        });
    });

    describe('on components update transforming stage source holders without timeout', () => {
        let withoutTimeout;

        beforeAll(() => {
            withoutTimeout = jest.fn();
            fsLightbox.core.sourcesHoldersTransformer.transform = jest.fn(() => ({
                withoutTimeout: withoutTimeout
            }));
            recreateSwipingSlideChangerAndCallChangeSlideToNext();
            // simulating onUpdate (in runtime it will be called by React)
            fsLightbox.componentsStates.slide.onUpdate();
        });

        it('should call transform', () => {
            expect(fsLightbox.core.sourcesHoldersTransformer.transform).toBeCalled();
        });

        it('should call withoutTimeout', () => {
            expect(withoutTimeout).toBeCalled();
        });
    });

    describe('adding transition to current and next source holder', () => {
        beforeAll(() => {
            swipingTransitioner.addTransitionToCurrentAndNext = jest.fn();
            recreateSwipingSlideChangerAndCallChangeSlideToNext();
        });

        it('should call addTransitionToCurrentAndNext from SwipingTransitioner', () => {
            expect(swipingTransitioner.addTransitionToCurrentAndNext).toBeCalled();
        });
    });
});
