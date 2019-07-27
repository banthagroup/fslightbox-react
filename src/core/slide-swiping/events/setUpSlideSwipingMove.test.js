import { setUpSlideSwipingMove } from "./setUpSlideSwipingMove";
import { SlideSwipingMoveActions } from "../actions/move/SlideSwipingMoveActions";
import * as getAnimationDebounceObject from "../../animations/getAnimationDebounce";

const slideSwipingMove = {};
const fsLightbox = {
    data: {
        sourcesCount: 0,
        isSwipingSlides: false,
    },
    injector: {
        resolve: (constructorDependency) => {
            if (constructorDependency === SlideSwipingMoveActions) {
                return slideSwipingMoveActions;
            }
        }
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

const slideSwipingMoveActions = {
    runActionsForEvent: () => {}
};

let swipingProps;
let moveEvent;
getAnimationDebounceObject.getAnimationDebounce = () => canRunNextAnimationFunc;
let isPreviousAnimationDebounced = false;
let canRunNextAnimationFunc = () => isPreviousAnimationDebounced;

const callListenerOnNewSlideSwipingMoveInstance = () => {
    setUpSlideSwipingMove(fsLightbox, swipingProps);
    slideSwipingMove.listener(moveEvent);
};

beforeEach(() => {
    fsLightbox.core.animationer.requestFrame = jest.fn();
    fsLightbox.data.sourcesCount = 4;
    moveEvent = {};
    slideSwipingMoveActions.runActionsForEvent = jest.fn();
});

test('simulating swipe (if there is only 1 slide)', () => {
    swipingProps = {
        swipedDifference: 0
    };
    fsLightbox.data.sourcesCount = 1;
    callListenerOnNewSlideSwipingMoveInstance();

    expect(swipingProps.swipedDifference).toEqual(1);
});

describe('not calling actions', () => {
    test(`due to there is only 1 slide even if previous animation is debounced and 
            down event occurred and swiping animation is not running`, () => {
        isPreviousAnimationDebounced = true;
        swipingProps = {
            isAfterSwipeAnimationRunning: false,
        };
        fsLightbox.data.isSwipingSlides = true;
        fsLightbox.data.sourcesCount = 1;
        swipingProps = {
            swipedDifference: 0
        };
        callListenerOnNewSlideSwipingMoveInstance();

        expect(slideSwipingMoveActions.runActionsForEvent).not.toBeCalled();
    });

    test(`due to down event hasn't occurred even if animation is not running 
            and previous animation is debounced and there is more than one slide`, () => {
        fsLightbox.data.sourcesCount = 2;
        isPreviousAnimationDebounced = true;
        swipingProps = {
            isAfterSwipeAnimationRunning: false,
        };
        fsLightbox.data.isSwipingSlides = false;
        callListenerOnNewSlideSwipingMoveInstance();

        expect(slideSwipingMoveActions.runActionsForEvent).not.toBeCalled();
    });

    test(`due to swiping animation is running, even if down event has occurred
            and previous animation is debounced and there is more than one slide`, () => {
        fsLightbox.data.sourcesCount = 2;
        isPreviousAnimationDebounced = true;
        swipingProps = {
            isAfterSwipeAnimationRunning: true,
        };
        fsLightbox.data.isSwipingSlides = true;
        callListenerOnNewSlideSwipingMoveInstance();

        expect(slideSwipingMoveActions.runActionsForEvent).not.toBeCalled();
    });

    test(`due to previous animation is not debounced even if down event has occurred
            and previous swiping animation is not running and there is more than one slide`, () => {
        fsLightbox.data.sourcesCount = 2;
        isPreviousAnimationDebounced = false;
        swipingProps = {
            isAfterSwipeAnimationRunning: false
        };
        fsLightbox.data.isSwipingSlides = true;
        callListenerOnNewSlideSwipingMoveInstance();

        expect(slideSwipingMoveActions.runActionsForEvent).not.toBeCalled();
    });
});

test(`calling actions (animation is not running and down event has occurred
        and previous animation is debounced and there is more than one slide)`, () => {
    fsLightbox.data.sourcesCount = 2;
    isPreviousAnimationDebounced = true;
    swipingProps = {
        isAfterSwipeAnimationRunning: false,
    };
    fsLightbox.data.isSwipingSlides = true;
    callListenerOnNewSlideSwipingMoveInstance();

    expect(slideSwipingMoveActions.runActionsForEvent).toBeCalledWith(moveEvent);
});
