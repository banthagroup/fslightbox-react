import { setUpSlideSwipingUp } from "../../../../src/core/slide-swiping/events/setUpSlideSwipingUp";
import { SlideSwipingUpActions } from "../../../../src/core/slide-swiping/actions/up/SlideSwipingUpActions";

const fsLightbox = {
    data: {
        isSwipingSlides: false,
        isAfterSwipeAnimationRunning: false
    },
    injector: {
        injectDependency: (constructorDependency) => {
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
        describe('due to isSwipingSlides is false even if isAfterSwipeAnimationRunning is false', () => {
            beforeEach(() => {
                fsLightbox.data.isSwipingSlides = false;
                swipingProps.isAfterSwipeAnimationRunning = false;
                slideSwipingUp.listener();
            });

            it('should not call resetSwiping', () => {
                expect(slideSwipingUpActions.resetSwiping).not.toBeCalled();
            });

            it('should not call closeLightbox', () => {
                expect(fsLightbox.core.lightboxCloser.closeLightbox).not.toBeCalled();
            });

            it('should not call runActions', () => {
                expect(slideSwipingUpActions.runActions).not.toBeCalled();
            });
        });

        describe('due to isAfterSwipeAnimationRunning is true even if isSwipingSlides is true', () => {
            beforeEach(() => {
                fsLightbox.data.isSwipingSlides = true;
                swipingProps.isAfterSwipeAnimationRunning = true;
                slideSwipingUp.listener();
            });

            it('should not call resetSwiping', () => {
                expect(slideSwipingUpActions.resetSwiping).not.toBeCalled();
            });

            it('should not call closeLightbox', () => {
                expect(fsLightbox.core.lightboxCloser.closeLightbox).not.toBeCalled();
            });

            it('should not call runActions', () => {
                expect(slideSwipingUpActions.runActions).not.toBeCalled();
            });
        });
    });

    describe('calling resetSwiping and closeLightbox but not calling runActions', () => {
        describe('due to swipedDifference === 0 and isSourceDownEventTarget === false', () => {
            beforeEach(() => {
                fsLightbox.data.isSwipingSlides = true;
                swipingProps.isAfterSwipeAnimationRunning = false;
                swipingProps.swipedDifference = 0;
                swipingProps.isSourceDownEventTarget = false;
                slideSwipingUp.listener();
            });

            it('should call resetSwiping', () => {
                expect(slideSwipingUpActions.resetSwiping).toBeCalled();
            });

            it('should call closeLightbox', () => {
                expect(fsLightbox.core.lightboxCloser.closeLightbox).toBeCalled();
            });

            it('should not call runActions', () => {
                expect(slideSwipingUpActions.runActions).not.toBeCalled();
            });
        });
    });

    describe('calling resetSwiping but not calling closeLightbox and runActions', () => {
        describe('due to swipedDifference === 0 and isSourceDownEventTarget === true', () => {
            beforeEach(() => {
                fsLightbox.data.isSwipingSlides = true;
                swipingProps.isAfterSwipeAnimationRunning = false;
                swipingProps.swipedDifference = 0;
                swipingProps.isSourceDownEventTarget = true;
                slideSwipingUp.listener();
            });

            it('should call resetSwiping', () => {
                expect(slideSwipingUpActions.resetSwiping).toBeCalled();
            });

            it('should not call closeLightbox', () => {
                expect(fsLightbox.core.lightboxCloser.closeLightbox).not.toBeCalled();
            });

            it('should not call runActions', () => {
                expect(slideSwipingUpActions.runActions).not.toBeCalled();
            });
        });
    });


    describe('calling resetSwiping and runActions, not calling closeLightbox', () => {
        describe('due to swipedDifference !== 0', () => {
            beforeEach(() => {
                fsLightbox.data.isSwipingSlides = true;
                swipingProps.isAfterSwipeAnimationRunning = false;
                swipingProps.swipedDifference = 10;
                swipingProps.isSourceDownEventTarget = true;
                slideSwipingUp.listener();
            });

            it('should call resetSwiping', () => {
                expect(slideSwipingUpActions.resetSwiping).toBeCalled();
            });

            it('should not call closeLightbox', () => {
                expect(fsLightbox.core.lightboxCloser.closeLightbox).not.toBeCalled();
            });

            it('should call runActions', () => {
                expect(slideSwipingUpActions.runActions).toBeCalled();
            });
        });
    });
});
