import { FsLightboxMock } from "../../../../../__mocks__/components/fsLightboxMock";
import { SwipingSlideChanger } from "../../../../../../src/core/SlideSwiping/Actions/Up/SwipingSlideChanger";
import { SlideSwipingUpActions } from "../../../../../../src/core/SlideSwiping/Actions/Up/SlideSwipingUpActions";
import { SwipingTransitioner } from "../../../../../../src/core/SlideSwiping/Actions/Up/SwipingTransitioner";

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();
fsLightboxMock.setAllSourceHoldersToDivs();
/** @var { SlideSwipingUpActions } slideSwipingUpActions */
let slideSwipingUpActions;
/** @var { SwipingSlideChanger } swipingSlideChanger */
let swipingSlideChanger;
/** @var { SwipingTransitioner } swipingTransitioner */
let swipingTransitioner;

const stageSourcesIndexes = {
    previous: 0,
    current: 1,
    next: 2,
};
let withoutTimeout;

beforeEach(() => {
    fsLightbox.state.slide = 2;
    withoutTimeout = jest.fn();
    fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders = jest.fn(() => ({
        withoutTimeout: withoutTimeout
    }));
    slideSwipingUpActions = new SlideSwipingUpActions(fsLightbox, {});
    swipingTransitioner = new SwipingTransitioner(fsLightbox);
    swipingTransitioner.addTransitionToCurrentAndPrevious = jest.fn();
    swipingTransitioner.addTransitionToCurrentAndNext = jest.fn();
    swipingSlideChanger = new SwipingSlideChanger(fsLightbox, swipingTransitioner);
    swipingSlideChanger.setStageSourcesIndexes(stageSourcesIndexes);
});

describe('changing slide to previous', () => {
    beforeEach(() => {
        swipingSlideChanger.changeSlideToPrevious();
    });

    it('should change slide to previous', () => {
        expect(fsLightbox.state.slide).toEqual(1);
    });

    describe('calling transformStageSourceHolders without timeout', () => {
        it('should call transformStageSourceHolders', () => {
            expect(fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders.mock.calls.length).toEqual(1);
        });

        it('should call withoutTimeout', () => {
            expect(withoutTimeout).toBeCalled();
        });
    });

    it('should call addTransitionToCurrentAndPrevious from transitioner', () => {
        expect(swipingTransitioner.addTransitionToCurrentAndPrevious).toBeCalled();
    });
});

describe('changing slide to next', () => {
    beforeEach(() => {
        swipingSlideChanger.changeSlideToNext();
    });

    it('should change slide to next', () => {
        expect(fsLightbox.state.slide).toEqual(3);
    });

    describe('calling transformStageSourceHolders without timeout', () => {
        it('should call transformStageSourceHolders', () => {
            expect(fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders.mock.calls.length).toEqual(1);
        });

        it('should call withoutTimeout', () => {
            expect(withoutTimeout).toBeCalled();
        });
    });

    it('should call addTransitionToCurrentAndNext from transitioner', () => {
        expect(swipingTransitioner.addTransitionToCurrentAndNext).toBeCalled();
    });
});
