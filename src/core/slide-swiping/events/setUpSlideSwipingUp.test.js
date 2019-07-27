import { setUpSlideSwipingUp } from "./setUpSlideSwipingUp";
import { SlideSwipingUpActions } from "../actions/up/SlideSwipingUpActions";

const fsLightbox = {
    data: {
        isSwipingSlides: false,
        isAfterSwipeAnimationRunning: false
    },
    injector: {
        resolve: (constructorDependency) => {
            if (constructorDependency === SlideSwipingUpActions) {
                return slideSwipingUpActions;
            }
        }
    },
    core: {
        lightboxCloser: {
            closeLightbox: () => {}
        },
        slideSwiping: {
            up: {}
        }
    }
};

const slideSwipingUp = fsLightbox.core.slideSwiping.up;

const slideSwipingUpActions = {
    resetSwiping: () => {},
    runActions: () => {}
};

const swipingProps = {
    isAfterSwipeAnimationRunning: false,
    isSourceDownEventTarget: false,
    swipedDifference: 0
};

setUpSlideSwipingUp(fsLightbox, swipingProps);

describe('listener', () => {
    beforeEach(() => {
        slideSwipingUpActions.resetSwiping = jest.fn();
        slideSwipingUpActions.runActions = jest.fn();
        fsLightbox.core.lightboxCloser.closeLightbox = jest.fn();
    });

    describe('not calling resetSwiping, closeLightbox, runActions', () => {
        test('due to isSwipingSlides is false even if isAfterSwipeAnimationRunning is false', () => {
            fsLightbox.data.isSwipingSlides = false;
            swipingProps.isAfterSwipeAnimationRunning = false;
            slideSwipingUp.listener();

            expect(slideSwipingUpActions.resetSwiping).not.toBeCalled();
            expect(fsLightbox.core.lightboxCloser.closeLightbox).not.toBeCalled();
            expect(slideSwipingUpActions.runActions).not.toBeCalled();
        });

        test('due to isAfterSwipeAnimationRunning is true even if isSwipingSlides is true', () => {
            fsLightbox.data.isSwipingSlides = true;
            swipingProps.isAfterSwipeAnimationRunning = true;
            slideSwipingUp.listener();

            expect(slideSwipingUpActions.resetSwiping).not.toBeCalled();
            expect(fsLightbox.core.lightboxCloser.closeLightbox).not.toBeCalled();
            expect(slideSwipingUpActions.runActions).not.toBeCalled();
        });
    });

    describe('calling resetSwiping and closeLightbox but not calling runActions', () => {
        test('due to swipedDifference === 0 and isSourceDownEventTarget === false', () => {
            fsLightbox.data.isSwipingSlides = true;
            swipingProps.isAfterSwipeAnimationRunning = false;
            swipingProps.swipedDifference = 0;
            swipingProps.isSourceDownEventTarget = false;
            slideSwipingUp.listener();

            expect(slideSwipingUpActions.resetSwiping).toBeCalled();
            expect(fsLightbox.core.lightboxCloser.closeLightbox).toBeCalled();
            expect(slideSwipingUpActions.runActions).not.toBeCalled();
        });
    });

    describe('calling resetSwiping but not calling closeLightbox and runActions', () => {
        test('due to swipedDifference === 0 and isSourceDownEventTarget === true', () => {
            fsLightbox.data.isSwipingSlides = true;
            swipingProps.isAfterSwipeAnimationRunning = false;
            swipingProps.swipedDifference = 0;
            swipingProps.isSourceDownEventTarget = true;
            slideSwipingUp.listener();

            expect(slideSwipingUpActions.resetSwiping).toBeCalled();
            expect(fsLightbox.core.lightboxCloser.closeLightbox).not.toBeCalled();
            expect(slideSwipingUpActions.runActions).not.toBeCalled();
        });
    });


    describe('calling resetSwiping and runActions, not calling closeLightbox', () => {
        test('due to swipedDifference !== 0', () => {
            fsLightbox.data.isSwipingSlides = true;
            swipingProps.isAfterSwipeAnimationRunning = false;
            swipingProps.swipedDifference = 10;
            swipingProps.isSourceDownEventTarget = true;
            slideSwipingUp.listener();

            expect(slideSwipingUpActions.resetSwiping).toBeCalled();
            expect(fsLightbox.core.lightboxCloser.closeLightbox).not.toBeCalled();
            expect(slideSwipingUpActions.runActions).toBeCalled();
        });
    });
});
