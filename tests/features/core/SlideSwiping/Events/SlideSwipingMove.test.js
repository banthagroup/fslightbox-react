import { FsLightboxMock } from "../../../../__mocks__/components/fsLightboxMock";
import { SlideSwipingMove } from "../../../../../src/Core/SlideSwiping/Events/SlideSwipingMove";

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();

beforeEach(() => {
    fsLightboxMock.setAllSourceHoldersToDivs();
});
/** @var { SlideSwipingMove } slideSwipingMove */
let slideSwipingMove;
let mockMoveActions;
let mockSwipingProps;
let mockMoveEvent;

const callListenerOnNewSlideSwipingMoveInstance = () => {
    slideSwipingMove = new SlideSwipingMove(fsLightbox, mockSwipingProps);
    slideSwipingMove.listener(mockMoveEvent);
};

beforeEach(() => {
    fsLightbox.data.totalSlides = 4;
    mockMoveEvent = {};
    mockMoveActions = {
        setMoveEvent: jest.fn(),
        runActions: jest.fn()
    };
    fsLightbox.injector.slideSwiping.getMoveActionsForSwipingProps = () => mockMoveActions;
});

describe('simulating swipe (if there is only 1 slide)', () => {
    beforeEach(() => {
        fsLightbox.data.totalSlides = 1;
        mockSwipingProps = {
            swipedDifference: 0
        };
        callListenerOnNewSlideSwipingMoveInstance();
    });

    it('should set swipedDifference to 1', () => {
        expect(mockSwipingProps.swipedDifference).toEqual(1);
    });
});

describe('not calling actions', () => {
    describe('due to there is only 1 slide', () => {
        beforeEach(() => {
            fsLightbox.data.totalSlides = 1;
            mockSwipingProps = {
                swipedDifference: 0
            };
            callListenerOnNewSlideSwipingMoveInstance();
        });

        it('should not call setMoveEvent', () => {
            expect(mockMoveActions.setMoveEvent).not.toBeCalled();
        });

        it('should not call runAllResizingActions', () => {
            expect(mockMoveActions.runActions).not.toBeCalled();
        });
    });

    describe("due to down event hasn't occurred and animation is running", () => {
        beforeEach(() => {
            mockSwipingProps = {
                isAfterSwipeAnimationRunning: true,
            };
            fsLightbox.state.isSwipingSlides = false;
            callListenerOnNewSlideSwipingMoveInstance();
        });

        it('should not call setMoveEvent', () => {
            expect(mockMoveActions.setMoveEvent).not.toBeCalled();
        });

        it('should not call runAllResizingActions', () => {
            expect(mockMoveActions.runActions).not.toBeCalled();
        });
    });

    describe("due to down event hasn't occurred even if animation is not running", () => {
        beforeEach(() => {
            mockSwipingProps = {
                isAfterSwipeAnimationRunning: false,
            };
            fsLightbox.state.isSwipingSlides = false;
            callListenerOnNewSlideSwipingMoveInstance();
        });

        it('should not call setMoveEvent', () => {
            expect(mockMoveActions.setMoveEvent).not.toBeCalled();
        });

        it('should not call runAllResizingActions', () => {
            expect(mockMoveActions.runActions).not.toBeCalled();
        });
    });

    describe('due to swiping animation is running, even if down event has occured', () => {
        beforeEach(() => {
            mockSwipingProps = {
                isAfterSwipeAnimationRunning: true,
            };
            fsLightbox.state.isSwipingSlides = true;
            callListenerOnNewSlideSwipingMoveInstance();
        });

        it('should not call setMoveEvent', () => {
            expect(mockMoveActions.setMoveEvent).not.toBeCalled();
        });

        it('should not call runAllResizingActions', () => {
            expect(mockMoveActions.runActions).not.toBeCalled();
        });
    });
});

describe('calling actions (animation is not running and down event has occurred)', () => {
    beforeEach(() => {
        mockSwipingProps = {
            isAfterSwipeAnimationRunning: false,
        };
        fsLightbox.state.isSwipingSlides = true;
        callListenerOnNewSlideSwipingMoveInstance();
    });

    it('should not call setMoveEvent with event', () => {
        expect(mockMoveActions.setMoveEvent).toBeCalledWith(mockMoveEvent);
    });

    it('should not call runAllResizingActions', () => {
        expect(mockMoveActions.runActions).toBeCalled();
    });
});