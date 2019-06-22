import { SlideSwipingUpActionsBucket } from "../../../../../src/core/slide-swiping/actions/up/SlideSwipingUpActionsBucket";
import { SlideSwipingUpActions } from "../../../../../src/core/slide-swiping/actions/up/SlideSwipingUpActions";
import { LIGHTBOX_CONTAINER, SOURCES_HOLDERS } from "../../../../../src/constants/elements";
import {
    CURSOR_GRABBING_CLASS_NAME,
    TRANSFORM_TRANSITION_CLASS_NAME
} from "../../../../../src/constants/classes-names";
import { ANIMATION_TIME } from "../../../../../src/constants/css-constants";

const fsLightbox = {
    componentsStates: {
        hasMovedWhileSwiping: {
            hasMovedWhileSwiping: {
                set: () => {}
            }
        }
    },
    core: {
        classListManager: {}
    },
    data: {
        isSwipingSlides: false
    },
    injector: {
        injectDependency: (constructorDependency) => {
            if (constructorDependency === SlideSwipingUpActionsBucket) {
                return slideSwipingUpActionsBucket;
            }
        }
    },
    stageIndexes: {
        previous: undefined,
        current: undefined,
        next: undefined
    }
};

const classListManager = fsLightbox.core.classListManager;

const slideSwipingUpActionsBucket = {
    changeSlideToPrevious: () => {},
    changeSlideToNext: () => {},
    addTransitionAndTransformZeroCurrentSlide: () => {}
};

const swipingProps = {
    isAfterSwipeAnimationRunning: undefined,
    swipedDifference: undefined
};
let slideSwipingUpActions;

const setUpAndCallRunActions = () => {
    slideSwipingUpActions = new SlideSwipingUpActions(fsLightbox, swipingProps);
    slideSwipingUpActions.runActions();
};

describe('resetSwiping', () => {
    beforeAll(() => {
        fsLightbox.componentsStates.hasMovedWhileSwiping.set = jest.fn();
        fsLightbox.data.isSwipingSlides = undefined;
        classListManager.ifElementHasClassRemoveIt = jest.fn();
        slideSwipingUpActions = new SlideSwipingUpActions(fsLightbox);
        slideSwipingUpActions.resetSwiping();
    });

    it('should set hasMovedWhileSwiping state to false', () => {
        expect(fsLightbox.componentsStates.hasMovedWhileSwiping.set).toBeCalledWith(false);
    });

    it('should set isSwipingSlides on data object to false', () => {
        expect(fsLightbox.data.isSwipingSlides).toBe(false);
    });

    it('should remove from lightbox container cursor grabbing class', () => {
        expect(classListManager.ifElementHasClassRemoveIt).toBeCalledWith(
            LIGHTBOX_CONTAINER,
            CURSOR_GRABBING_CLASS_NAME
        );
    });
});

describe('runActions', () => {
    describe('changing slide or transitioning and transforming current slide source', () => {
        beforeEach(() => {
            slideSwipingUpActionsBucket.addTransitionAndTransformZeroCurrentSlide = jest.fn();
            slideSwipingUpActionsBucket.changeSlideToNext = jest.fn();
            slideSwipingUpActionsBucket.changeSlideToPrevious = jest.fn();
        });

        describe('swipingProps.swipedDifference > 0', () => {
            beforeEach(() => {
                swipingProps.swipedDifference = 10;
            });

            describe('stageIndexes.previous = undefined', () => {
                beforeEach(() => {
                    fsLightbox.stageIndexes.previous = undefined;
                    setUpAndCallRunActions();
                });

                it('should call proper bucket method', () => {
                    expect(slideSwipingUpActionsBucket.changeSlideToPrevious).not.toBeCalled();
                    expect(slideSwipingUpActionsBucket.changeSlideToNext).not.toBeCalled();
                    expect(slideSwipingUpActionsBucket.addTransitionAndTransformZeroCurrentSlide).toBeCalled();
                });
            });

            describe('stageIndexes.previous is defined', () => {
                beforeEach(() => {
                    fsLightbox.stageIndexes.previous = 4;
                    setUpAndCallRunActions();
                });

                it('should call proper bucket method', () => {
                    expect(slideSwipingUpActionsBucket.changeSlideToPrevious).toBeCalled();
                    expect(slideSwipingUpActionsBucket.changeSlideToNext).not.toBeCalled();
                    expect(slideSwipingUpActionsBucket.addTransitionAndTransformZeroCurrentSlide).not.toBeCalled();
                });
            });
        });

        describe('swipingProps.swipedDifference < 0', () => {
            beforeEach(() => {
                swipingProps.swipedDifference = -10;
            });

            describe('stageIndexes.next = undefined', () => {
                beforeEach(() => {
                    fsLightbox.stageIndexes.next = undefined;
                    setUpAndCallRunActions();
                });

                it('should call proper bucket method', () => {
                    expect(slideSwipingUpActionsBucket.changeSlideToPrevious).not.toBeCalled();
                    expect(slideSwipingUpActionsBucket.changeSlideToNext).not.toBeCalled();
                    expect(slideSwipingUpActionsBucket.addTransitionAndTransformZeroCurrentSlide).toBeCalled();
                });
            });

            describe('stageIndexes.next is defined', () => {
                beforeEach(() => {
                    fsLightbox.stageIndexes.next = 4;
                    setUpAndCallRunActions();
                });

                it('should call proper bucket method', () => {
                    expect(slideSwipingUpActionsBucket.changeSlideToPrevious).not.toBeCalled();
                    expect(slideSwipingUpActionsBucket.changeSlideToNext).toBeCalled();
                    expect(slideSwipingUpActionsBucket.addTransitionAndTransformZeroCurrentSlide).not.toBeCalled();
                });
            });
        });
    });

    describe('setting up swiping props', () => {
        beforeAll(() => {
            swipingProps.isAfterSwipeAnimationRunning = undefined;
            swipingProps.swipedDifference = undefined;
            setUpAndCallRunActions();
        });

        it('should set isAfterSwipeAnimationRunning to true', () => {
            expect(swipingProps.isAfterSwipeAnimationRunning).toBe(true);
        });

        it('should set swipedDifference to 0', () => {
            expect(swipingProps.swipedDifference).toBe(0);
        });
    });

    describe('after timeout actions', () => {
        let setTimeoutParams;

        beforeAll(() => {
            fsLightbox.data.sourcesCount = 4;
            classListManager.ifElementFromArrayAtIndexHasClassRemoveIt = jest.fn();
            window.setTimeout = (...params) => {
                setTimeoutParams = params;
            };
            setUpAndCallRunActions();
        });

        it('should call setTimeout with animation time', () => {
            expect(setTimeoutParams[1]).toBe(ANIMATION_TIME);
        });

        describe('callback', () => {
            beforeAll(() => {
                setTimeoutParams[0]();
            });

            it('should ifElementFromArrayAtIndexHasClassRemoveIt for all sources holders', () => {
                expect(classListManager.ifElementFromArrayAtIndexHasClassRemoveIt).toBeCalledTimes(4);
                for (let i = 0; i < 4; i++) {
                    expect(classListManager.ifElementFromArrayAtIndexHasClassRemoveIt).toBeCalledWith(
                        SOURCES_HOLDERS,
                        i,
                        TRANSFORM_TRANSITION_CLASS_NAME
                    );
                }
            });
        });
    });
});
