import { SlideSwipingUpActions } from "../../../../src/core/slide-swiping/actions/up/SlideSwipingUpActions";
import { setUpSlideSwipingUp } from "../../../../src/core/slide-swiping/events/setUpSlideSwipingUp";

const slideSwipingUp = {};
const slideSwipingUpActions = {
    setUpTransformSourceHolders: jest.fn(),
    resetSwiping: () => {},
    runActions: () => {}
};
const fsLightbox = {
    data: {
        isSwipingSlides: false,
        isAfterSwipeAnimationRunning: false
    },
    injector: {
        injectDependency: jest.fn(() => slideSwipingUpActions)
    },
    core: {
        lightboxCloser: {
            closeLightbox: () => {}
        },
        slideSwiping: {
            up: slideSwipingUp
        }
    }
};
const swipingProps = {
    isAfterSwipeAnimationRunning: false,
    isSourceDownEventTarget: false,
    swipedDifference: 0
};

setUpSlideSwipingUp(fsLightbox, swipingProps);

describe('constructor', () => {
    it('should call injectDependency with SlideSwipingUpActions function and array with swipingProps', () => {
        expect(fsLightbox.injector.injectDependency).toBeCalledWith(SlideSwipingUpActions, [swipingProps]);
    });

    it('should call setUpTransformSourceHolders on actions instance', () => {
        expect(slideSwipingUpActions.setUpTransformSourceHolders).toBeCalled();
    });
});

describe('listener', () => {
    beforeEach(() => {
        slideSwipingUpActions.resetSwiping = jest.fn();
        slideSwipingUpActions.runActions = jest.fn();
        fsLightbox.core.lightboxCloser.closeLightbox = jest.fn();
    });

    describe('not calling resetSwiping, closeLightbox, runActionsForSourceTypeAndIndex', () => {
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

            it('should not call runActionsForSourceTypeAndIndex', () => {
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

            it('should not call runActionsForSourceTypeAndIndex', () => {
                expect(slideSwipingUpActions.runActions).not.toBeCalled();
            });
        });
    });

    describe('calling resetSwiping and closeLightbox but not calling runActionsForSourceTypeAndIndex', () => {
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

            it('should not call runActionsForSourceTypeAndIndex', () => {
                expect(slideSwipingUpActions.runActions).not.toBeCalled();
            });
        });
    });

    describe('calling resetSwiping but not calling closeLightbox and runActionsForSourceTypeAndIndex', () => {
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

            it('should not call runActionsForSourceTypeAndIndex', () => {
                expect(slideSwipingUpActions.runActions).not.toBeCalled();
            });
        });
    });


    describe('calling resetSwiping and runActionsForSourceTypeAndIndex, not calling closeLightbox', () => {
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

            it('should call runActionsForSourceTypeAndIndex', () => {
                expect(slideSwipingUpActions.runActions).toBeCalled();
            });
        });
    });
});
