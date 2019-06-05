import { setUpSlideSwipingMove } from "../../../../src/core/slide-swiping/events/setUpSlideSwipingMove";
import { SlideSwipingMoveActions } from "../../../../src/core/slide-swiping/actions/move/SlideSwipingMoveActions";
import * as getAnimationDebounceObject from "../../../../src/core/animations/getAnimationDebounce";

const slideSwipingMove = {};
let moveActions = {
    setMoveEvent: () => {},
    runActions: () => {}
};
const fsLightbox = {
    data: {
        totalSlides: 0,
        isSwipingSlides: false,
    },
    injector: {
        injectDependency: () => moveActions
    },
    core: {
        animationer: {
            requestFrame: () => {}
        },
        slideSwiping: {
            move: slideSwipingMove
        }
    }
};
let swipingProps;
let moveEvent;
getAnimationDebounceObject.getAnimationDebounce = () => canRunNextAnimationFunc;
let isPrevoiusAnimationDebounced = false;
let canRunNextAnimationFunc = () => isPrevoiusAnimationDebounced;

const callListenerOnNewSlideSwipingMoveInstance = () => {
    setUpSlideSwipingMove(fsLightbox, swipingProps);
    slideSwipingMove.listener(moveEvent);
};

beforeEach(() => {
    fsLightbox.core.animationer.requestFrame = jest.fn();
    fsLightbox.data.totalSlides = 4;
    moveEvent = {};
    moveActions = {
        setMoveEvent: jest.fn(),
        runActions: jest.fn()
    };
});

describe('injecting actions', () => {
    beforeAll(() => {
        fsLightbox.injector.injectDependency = jest.fn(() => slideSwipingMove);
        callListenerOnNewSlideSwipingMoveInstance();
    });

    it('should call injectDependency with SlideSwipingMoveActions', () => {
        expect(fsLightbox.injector.injectDependency).toBeCalledWith(SlideSwipingMoveActions, [swipingProps]);
    });

    afterAll(() => {
        fsLightbox.injector.injectDependency = () => moveActions;
    });
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
    describe(`due to there is only 1 slide even if previous animation is debounced and 
            down event occurred and swiping animation is not running`, () => {
        beforeEach(() => {
            isPrevoiusAnimationDebounced = true;
            swipingProps = {
                isAfterSwipeAnimationRunning: false,
            };
            fsLightbox.data.isSwipingSlides = true;
            fsLightbox.data.totalSlides = 1;
            swipingProps = {
                swipedDifference: 0
            };
            callListenerOnNewSlideSwipingMoveInstance();
        });

        it('should not call setMoveEvent', () => {
            expect(moveActions.setMoveEvent).not.toBeCalled();
        });

        it('should not call runActions', () => {
            expect(moveActions.runActions).not.toBeCalled();
        });
    });

    describe(`due to down event hasn't occurred even if animation is not running 
            and previous animation is debounced and there is more than one slide`, () => {
        beforeEach(() => {
            fsLightbox.data.totalSlides = 2;
            isPrevoiusAnimationDebounced = true;
            swipingProps = {
                isAfterSwipeAnimationRunning: false,
            };
            fsLightbox.data.isSwipingSlides = false;
            callListenerOnNewSlideSwipingMoveInstance();
        });

        it('should not call setMoveEvent', () => {
            expect(moveActions.setMoveEvent).not.toBeCalled();
        });

        it('should not call runActions', () => {
            expect(moveActions.runActions).not.toBeCalled();
        });
    });

    describe(`due to swiping animation is running, even if down event has occurred
            and previous animation is debounced and there is more than one slide`, () => {
        beforeEach(() => {
            fsLightbox.data.totalSlides = 2;
            isPrevoiusAnimationDebounced = true;
            swipingProps = {
                isAfterSwipeAnimationRunning: true,
            };
            fsLightbox.data.isSwipingSlides = true;
            callListenerOnNewSlideSwipingMoveInstance();
        });

        it('should not call setMoveEvent', () => {
            expect(moveActions.setMoveEvent).not.toBeCalled();
        });

        it('should not call runActions', () => {
            expect(moveActions.runActions).not.toBeCalled();
        });
    });

    describe(`due to previous animation is not debounced even if down event has occurred
            and previous swiping animation is not running and there is more than one slide`, () => {
        beforeEach(() => {
            fsLightbox.data.totalSlides = 2;
            isPrevoiusAnimationDebounced = false;
            swipingProps = {
                isAfterSwipeAnimationRunning: false
            };
            fsLightbox.data.isSwipingSlides = true;
            callListenerOnNewSlideSwipingMoveInstance();
        });

        it('should not call setMoveEvent', () => {
            expect(moveActions.setMoveEvent).not.toBeCalled();
        });

        it('should not call runActions', () => {
            expect(moveActions.runActions).not.toBeCalled();
        });
    });
});

describe(`calling actions (animation is not running and down event has occurred
        and previous animation is debounced and there is more than one slide)`, () => {
    beforeEach(() => {
        fsLightbox.data.totalSlides = 2;
        isPrevoiusAnimationDebounced = true;
        swipingProps = {
            isAfterSwipeAnimationRunning: false,
        };
        fsLightbox.data.isSwipingSlides = true;
        callListenerOnNewSlideSwipingMoveInstance();
    });

    it('should not call setMoveEvent with event', () => {
        expect(moveActions.setMoveEvent).toBeCalledWith(moveEvent);
    });

    it('should not call runActions', () => {
        expect(moveActions.runActions).toBeCalled();
    });
});
