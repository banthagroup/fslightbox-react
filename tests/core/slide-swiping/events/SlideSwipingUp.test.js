import { SlideSwipingUp } from "../../../../src/core/slide-swiping/events/SlideSwipingUp";

let isSwipingSlidesStateValue;
const fsLightbox = {
    componentsStates: {
        isSwipingSlides: {
            get: () => isSwipingSlidesStateValue,
            set: () => {},
        }
    },
    injector: {
        slideSwiping: {
            getUpActionsForSwipingProps: () => {},
        }
    },
    core: {
        lightboxCloser: {
            closeLightbox: () => {}
        }
    }
};
let event;
let swipingProps = {};
/** @var { SlideSwipingUpActions } upActions */
let slideSwipingUpActions;
/** @var { SlideSwipingUp } slideSwipingUp */
let slideSwipingUp;

beforeEach(() => {
    event = {};
    slideSwipingUpActions = {
        setUpMethodsAccordingToNumberOfSlides: jest.fn(),
        setUpTransformSourceHolders: jest.fn(),
        setUpEvent: jest.fn(),
        runActions: jest.fn(),
    };
    fsLightbox.injector.slideSwiping.getUpActionsForSwipingProps = jest.fn(() => slideSwipingUpActions);
});

const createSlideSwipingUpAndRunListener = () => {
    slideSwipingUp = new SlideSwipingUp(fsLightbox, swipingProps);
    slideSwipingUp.listener(event);
};

describe('constructor', () => {
    beforeEach(() => {
        slideSwipingUp = new SlideSwipingUp(fsLightbox, swipingProps);
    });

    it('should call getUpActionsForSwipingProps with swiping props', () => {
        expect(fsLightbox.injector.slideSwiping.getUpActionsForSwipingProps).toBeCalledWith(swipingProps);
    });

    it('should call setUpTransformSourceHolders on actions instance', () => {
        expect(slideSwipingUpActions.setUpTransformSourceHolders).toBeCalled();
    });
});

describe('not calling runActions', () => {
    describe(`due to user is not swiping, even if animation is not running and swiped difference not equal 0`,
        () => {
            beforeEach(() => {
                swipingProps = {
                    swipedDifference: 100,
                    isAfterSwipeAnimationRunning: false
                };
                fsLightbox.componentsStates.isSwipingSlides.get = () => false;
                createSlideSwipingUpAndRunListener();
            });

            it('should not call run actions', () => {
                expect(slideSwipingUpActions.runActions).not.toBeCalled();
            });
        });

    describe(`due to swiping animation is running, even if swiped difference is not equal 0 and user is swiping`,
        () => {
            beforeEach(() => {
                swipingProps = {
                    swipedDifference: 100,
                    isAfterSwipeAnimationRunning: true
                };
                fsLightbox.componentsStates.isSwipingSlides.get = () => true;
                createSlideSwipingUpAndRunListener();
            });

            it('should not call run actions', () => {
                expect(slideSwipingUpActions.runActions).not.toBeCalled();
            });
        });

    describe(`due to swiped difference equals 0, even if user is swiping and swiping animation is not running`,
        () => {
            beforeEach(() => {
                swipingProps = {
                    isSourceDownEventTarget: true,
                    swipedDifference: 0,
                    isAfterSwipeAnimationRunning: false
                };
                fsLightbox.componentsStates.isSwipingSlides.get = () => true;
                createSlideSwipingUpAndRunListener();
            });

            it('should not call run actions', () => {
                expect(slideSwipingUpActions.runActions).not.toBeCalled();
            });
        });
});


describe(`setting isSwipingSlides to false and closing lightbox if sources is not down event target`, () => {
    beforeEach(() => {
        fsLightbox.core.lightboxCloser.closeLightbox = jest.fn();
        swipingProps = {
            isSourceDownEventTarget: false,
            // swiped difference = 0 (user didn't swipe)
            swipedDifference: 0,
            isAfterSwipeAnimationRunning: false
        };
        // user is swiping slides
        isSwipingSlidesStateValue = true;
        fsLightbox.componentsStates.isSwipingSlides.set = jest.fn((state) => isSwipingSlidesStateValue = state);
    });

    describe('setting isSwipingSlides to false', () => {
        beforeEach(() => {
            createSlideSwipingUpAndRunListener();
        });

        it('should set isSwipingSlides to false', () => {
            expect(isSwipingSlidesStateValue).toBeFalsy();
        });
    });

    describe('not closing lightbox due to sources is down event target', () => {
        beforeEach(() => {
            swipingProps.isSourceDownEventTarget = true;
            createSlideSwipingUpAndRunListener();
        });

        it('should not call closeLightbox', () => {
            expect(fsLightbox.core.lightboxCloser.closeLightbox).not.toBeCalled();
        });
    });

    describe('closing lightbox - source is not event target', () => {
        beforeEach(() => {
            fsLightbox.componentsStates.isSwipingSlides.get = () => true;
            swipingProps.isSourceDownEventTarget = false;
            createSlideSwipingUpAndRunListener();
        });

        it('should call closeLightbox', () => {
            expect(fsLightbox.core.lightboxCloser.closeLightbox).toBeCalled();
        });
    });
});

describe(`calling actions (swiped difference !== 0, after swipe animation is not running
        and isSwipingSlides state set to true)`, () => {
    beforeEach(() => {
        swipingProps = {
            swipedDifference: 100,
            isAfterSwipeAnimationRunning: false
        };
        fsLightbox.componentsStates.isSwipingSlides.get = () => true;
        createSlideSwipingUpAndRunListener();
    });

    it('should call run actions', () => {
        expect(slideSwipingUpActions.runActions).toBeCalled();
    });
});