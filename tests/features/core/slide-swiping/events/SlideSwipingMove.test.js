import { SlideSwipingMove } from "../../../../../src/core/slide-swiping/events/SlideSwipingMove";

let isSwipingSlides = false;
let moveActions = {
    setMoveEvent: () => {},
    runActions: () => {}
};
const fsLightbox = {
    data: {
        totalSlides: 0
    },
    componentsStates: {
        isSwipingSlides: {
            get: () => isSwipingSlides,
            set: (boolean) => isSwipingSlides = boolean
        }
    },
    injector: {
        slideSwiping: {
            getMoveActionsForSwipingProps: () => moveActions
        }
    }
};

/** @var { SlideSwipingMove } slideSwipingMove */
let slideSwipingMove;
let swipingProps;
let moveEvent;

const callListenerOnNewSlideSwipingMoveInstance = () => {
    slideSwipingMove = new SlideSwipingMove(fsLightbox, swipingProps);
    slideSwipingMove.listener(moveEvent);
};

beforeEach(() => {
    fsLightbox.data.totalSlides = 4;
    moveEvent = {};
    moveActions = {
        setMoveEvent: jest.fn(),
        runActions: jest.fn()
    };
});

describe('simulating swipe (if there is only 1 slide)', () => {
    beforeEach(() => {
        fsLightbox.data.totalSlides = 1;
        swipingProps = {
            swipedDifference: 0
        };
        callListenerOnNewSlideSwipingMoveInstance();
    });

    it('should set swipedDifference to 1', () => {
        expect(swipingProps.swipedDifference).toEqual(1);
    });
});

describe('not calling actions', () => {
    describe('due to there is only 1 slide', () => {
        beforeEach(() => {
            fsLightbox.data.totalSlides = 1;
            swipingProps = {
                swipedDifference: 0
            };
            callListenerOnNewSlideSwipingMoveInstance();
        });

        it('should not call setMoveEvent', () => {
            expect(moveActions.setMoveEvent).not.toBeCalled();
        });

        it('should not call runAllResizingActions', () => {
            expect(moveActions.runActions).not.toBeCalled();
        });
    });

    describe("due to down event hasn't occurred and animation is running", () => {
        beforeEach(() => {
            swipingProps = {
                isAfterSwipeAnimationRunning: true,
            };
            isSwipingSlides = false;
            callListenerOnNewSlideSwipingMoveInstance();
        });

        it('should not call setMoveEvent', () => {
            expect(moveActions.setMoveEvent).not.toBeCalled();
        });

        it('should not call runAllResizingActions', () => {
            expect(moveActions.runActions).not.toBeCalled();
        });
    });

    describe("due to down event hasn't occurred even if animation is not running", () => {
        beforeEach(() => {
            swipingProps = {
                isAfterSwipeAnimationRunning: false,
            };
            isSwipingSlides = false;
            callListenerOnNewSlideSwipingMoveInstance();
        });

        it('should not call setMoveEvent', () => {
            expect(moveActions.setMoveEvent).not.toBeCalled();
        });

        it('should not call runAllResizingActions', () => {
            expect(moveActions.runActions).not.toBeCalled();
        });
    });

    describe('due to swiping animation is running, even if down event has occured', () => {
        beforeEach(() => {
            swipingProps = {
                isAfterSwipeAnimationRunning: true,
            };
            isSwipingSlides = true;
            callListenerOnNewSlideSwipingMoveInstance();
        });

        it('should not call setMoveEvent', () => {
            expect(moveActions.setMoveEvent).not.toBeCalled();
        });

        it('should not call runAllResizingActions', () => {
            expect(moveActions.runActions).not.toBeCalled();
        });
    });
});

describe('calling actions (animation is not running and down event has occurred)', () => {
    beforeEach(() => {
        swipingProps = {
            isAfterSwipeAnimationRunning: false,
        };
        isSwipingSlides = true;
        callListenerOnNewSlideSwipingMoveInstance();
    });

    it('should not call setMoveEvent with event', () => {
        expect(moveActions.setMoveEvent).toBeCalledWith(moveEvent);
    });

    it('should not call runAllResizingActions', () => {
        expect(moveActions.runActions).toBeCalled();
    });
});