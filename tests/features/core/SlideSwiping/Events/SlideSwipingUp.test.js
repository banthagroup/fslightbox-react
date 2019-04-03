import { FsLightboxMock } from "../../../../__mocks__/components/fsLightboxMock";
import { SlideSwipingUp } from "../../../../../src/core/SlideSwiping/Events/SlideSwipingUp";

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();
let mockEvent;
let mockSwipingProps;
let mockUpActions;
/** @var { SlideSwipingUp } slideSwipingUp */
let slideSwipingUp;

beforeEach(() => {
    mockEvent = {};
    mockUpActions = {
        setUpEvent: jest.fn(),
        runActions: jest.fn(),
    };
    fsLightbox.injector.slideSwiping.getUpActionsForSwipingProps = () => mockUpActions;
});

const createSlideSwipingUpAndRunListener = () => {
    slideSwipingUp = new SlideSwipingUp(fsLightbox, mockSwipingProps);
    slideSwipingUp.listener(mockEvent);
};

describe('not calling actions', () => {
    describe(`due to user is not swiping, even if animation is not running and swiped difference not equal 0`,
        () => {
            beforeEach(() => {
                mockSwipingProps = {
                    swipedDifference: 100,
                    isAfterSwipeAnimationRunning: false
                };
                fsLightbox.state.isSwipingSlides = false;
                createSlideSwipingUpAndRunListener();
            });

            it('should not call set up event', () => {
                expect(mockUpActions.setUpEvent).not.toBeCalled();
            });

            it('should not call run actions', () => {
                expect(mockUpActions.runActions).not.toBeCalled();
            });
        });

    describe(`due to swiped difference is equal 0, even if animation is not running and user is swiping`,
        () => {
            beforeEach(() => {
                mockSwipingProps = {
                    swipedDifference: 0,
                    isAfterSwipeAnimationRunning: false
                };
                fsLightbox.state.isSwipingSlides = true;
                createSlideSwipingUpAndRunListener();
            });

            it('should not call set up event', () => {
                expect(mockUpActions.setUpEvent).not.toBeCalled();
            });

            it('should not call run actions', () => {
                expect(mockUpActions.runActions).not.toBeCalled();
            });
        });

    describe(`due to swiping animation is running, even if swiped difference is not equal 0 and user is swiping`,
        () => {
            beforeEach(() => {
                mockSwipingProps = {
                    swipedDifference: 0,
                    isAfterSwipeAnimationRunning: true
                };
                fsLightbox.state.isSwipingSlides = true;
                createSlideSwipingUpAndRunListener();
            });

            it('should not call set up event', () => {
                expect(mockUpActions.setUpEvent).not.toBeCalled();
            });

            it('should not call run actions', () => {
                expect(mockUpActions.runActions).not.toBeCalled();
            });
        });
});

describe('calling actions', () => {
     beforeEach(() => {
         mockSwipingProps = {
             swipedDifference: 100,
             isAfterSwipeAnimationRunning: false
         };
         fsLightbox.state.isSwipingSlides = true;
         createSlideSwipingUpAndRunListener();
     });

    it('should call set up event with event', () => {
        expect(mockUpActions.setUpEvent).toBeCalledWith(mockEvent);
    });

    it('should call run actions', () => {
        expect(mockUpActions.runActions).toBeCalled();
    });
});