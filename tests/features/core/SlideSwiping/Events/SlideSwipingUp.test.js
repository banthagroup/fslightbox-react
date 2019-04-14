import { FsLightboxMock } from "../../../../__mocks__/components/fsLightboxMock";
import { SlideSwipingUp } from "../../../../../src/core/SlideSwiping/Events/SlideSwipingUp";

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();
let mockEvent;
let mockSwipingProps = {};
let mockUpActions;
/** @var { SlideSwipingUp } slideSwipingUp */
let slideSwipingUp;

beforeEach(() => {
    mockEvent = {};
    mockUpActions = {
        setUpMethodsAccordingToNumberOfSlides: jest.fn(),
        setUpTransformSourceHolders: jest.fn(),
        setUpEvent: jest.fn(),
        runActions: jest.fn(),
    };
    fsLightbox.injector.slideSwiping.getUpActionsForSwipingProps = jest.fn(() => mockUpActions);
});

const createSlideSwipingUpAndRunListener = () => {
    slideSwipingUp = new SlideSwipingUp(fsLightbox, mockSwipingProps);
    slideSwipingUp.listener(mockEvent);
};

describe('constructor', () => {
    beforeEach(() => {
        slideSwipingUp = new SlideSwipingUp(fsLightbox, mockSwipingProps);
    });

    it('should call getUpActionsForSwipingProps with swiping props', () => {
        expect(fsLightbox.injector.slideSwiping.getUpActionsForSwipingProps).toBeCalledWith(mockSwipingProps);
    });

    it('should call setUpTransformSourceHolders on actions instance', () => {
        expect(mockUpActions.setUpTransformSourceHolders).toBeCalled();
    });
});

describe('not calling runAllResizingActions', () => {
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

            it('should not call run actions', () => {
                expect(mockUpActions.runActions).not.toBeCalled();
            });
        });

    describe(`due to swiping animation is running, even if swiped difference is not equal 0 and user is swiping`,
        () => {
            beforeEach(() => {
                mockSwipingProps = {
                    swipedDifference: 100,
                    isAfterSwipeAnimationRunning: true
                };
                fsLightbox.state.isSwipingSlides = true;
                createSlideSwipingUpAndRunListener();
            });

            it('should not call run actions', () => {
                expect(mockUpActions.runActions).not.toBeCalled();
            });
        });

    describe(`due to swiped difference equals 0, even if user is swiping and swiping animation is not running`,
        () => {
            beforeEach(() => {
                mockSwipingProps = {
                    isSourceDownEventTarget: true,
                    swipedDifference: 0,
                    isAfterSwipeAnimationRunning: false
                };
                fsLightbox.state.isSwipingSlides = true;
                createSlideSwipingUpAndRunListener();
            });

            it('should not call run actions', () => {
                expect(mockUpActions.runActions).not.toBeCalled();
            });
        });
});


describe('setting isSwipingSlides to false and closing lightbox if source is not down event target', () => {
    beforeEach(() => {
        fsLightbox.core.closeOpenLightbox.closeLightbox = jest.fn();
        mockSwipingProps = {
            isSourceDownEventTarget: false,
            swipedDifference: 0,
            isAfterSwipeAnimationRunning: false
        };
        fsLightbox.state.isSwipingSlides = true;
    });

    describe('setting isSwipingSlides to false', () => {
        beforeEach(() => {
            createSlideSwipingUpAndRunListener();
        });

        it('should set isSwipingSlides to false', () => {
            expect(fsLightbox.state.isSwipingSlides).toBeFalsy();
        });
    });

    describe('not closing lightbox due to source is down event target', () => {
        beforeEach(() => {
            mockSwipingProps.isSourceDownEventTarget = true;
            createSlideSwipingUpAndRunListener();
        });

        it('should not call closeLightbox', () => {
            expect(fsLightbox.core.closeOpenLightbox.closeLightbox).not.toBeCalled();
        });
    });

    describe('closing lightbox - source is not event target', () => {
        beforeEach(() => {
            mockSwipingProps.isSourceDownEventTarget = false;
            createSlideSwipingUpAndRunListener();
        });

        it('should call closeLightbox', () => {
            expect(fsLightbox.core.closeOpenLightbox.closeLightbox).toBeCalled();
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

    it('should call run actions', () => {
        expect(mockUpActions.runActions).toBeCalled();
    });
});