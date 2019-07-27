import { SlideSwipingUpActionsBucket } from "./SlideSwipingUpActionsBucket";
import { SlideSwipingUpActions } from "./SlideSwipingUpActions";
import { LIGHTBOX_CONTAINER, SOURCES_HOLDERS } from "../../../../constants/elements";
import {
    CURSOR_GRABBING_CLASS_NAME,
    TRANSFORM_TRANSITION_CLASS_NAME
} from "../../../../constants/classes-names";
import { ANIMATION_TIME } from "../../../../constants/css-constants";

const fsLightbox = {
    componentsStates: {
        hasMovedWhileSwiping: {
            hasMovedWhileSwiping: {
                set: () => {}
            }
        }
    },
    core: {
        classListManager: {
            manageElement: () => ({
                removeIfContains: () => {}
            }),
            manageArrayElementAtIndex: () => ({
                removeIfContains: () => {}
            })
        }
    },
    data: {
        isSwipingSlides: false
    },
    injector: {
        resolve: (constructorDependency) => {
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
    addTransitionAndTransformZeroCurrentSlideSource: () => {}
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

test('resetSwiping', () => {
    fsLightbox.componentsStates.hasMovedWhileSwiping.set = jest.fn();
    fsLightbox.data.isSwipingSlides = undefined;
    const removeIfContains = jest.fn();
    classListManager.manageElement = (elementName) => {
        if (elementName === LIGHTBOX_CONTAINER) {
            return {
                removeIfContains: removeIfContains
            };
        }
    };
    slideSwipingUpActions = new SlideSwipingUpActions(fsLightbox);
    slideSwipingUpActions.resetSwiping();

    expect(fsLightbox.componentsStates.hasMovedWhileSwiping.set).toBeCalledWith(false);
    expect(fsLightbox.data.isSwipingSlides).toBe(false);
    expect(removeIfContains).toBeCalledWith(CURSOR_GRABBING_CLASS_NAME);
});

describe('runActions', () => {
    describe('changing slide or transitioning and transforming current slide source', () => {
        beforeEach(() => {
            slideSwipingUpActionsBucket.addTransitionAndTransformZeroCurrentSlideSource = jest.fn();
            slideSwipingUpActionsBucket.changeSlideToNext = jest.fn();
            slideSwipingUpActionsBucket.changeSlideToPrevious = jest.fn();
        });

        describe('swipingProps.swipedDifference > 0', () => {
            beforeEach(() => {
                swipingProps.swipedDifference = 10;
            });

            test('stageIndexes.previous = undefined', () => {
                fsLightbox.stageIndexes.previous = undefined;
                setUpAndCallRunActions();

                expect(slideSwipingUpActionsBucket.changeSlideToPrevious).not.toBeCalled();
                expect(slideSwipingUpActionsBucket.changeSlideToNext).not.toBeCalled();
                expect(slideSwipingUpActionsBucket.addTransitionAndTransformZeroCurrentSlideSource).toBeCalled();
            });

            test('stageIndexes.previous is defined', () => {
                fsLightbox.stageIndexes.previous = 4;
                setUpAndCallRunActions();

                expect(slideSwipingUpActionsBucket.changeSlideToPrevious).toBeCalled();
                expect(slideSwipingUpActionsBucket.changeSlideToNext).not.toBeCalled();
                expect(slideSwipingUpActionsBucket.addTransitionAndTransformZeroCurrentSlideSource).not.toBeCalled();
            });
        });

        describe('swipingProps.swipedDifference < 0', () => {
            beforeEach(() => {
                swipingProps.swipedDifference = -10;
            });

            test('stageIndexes.next = undefined', () => {
                fsLightbox.stageIndexes.next = undefined;
                setUpAndCallRunActions();

                expect(slideSwipingUpActionsBucket.changeSlideToPrevious).not.toBeCalled();
                expect(slideSwipingUpActionsBucket.changeSlideToNext).not.toBeCalled();
                expect(slideSwipingUpActionsBucket.addTransitionAndTransformZeroCurrentSlideSource).toBeCalled();
            });

            test('stageIndexes.next is defined', () => {
                fsLightbox.stageIndexes.next = 4;
                setUpAndCallRunActions();

                expect(slideSwipingUpActionsBucket.changeSlideToPrevious).not.toBeCalled();
                expect(slideSwipingUpActionsBucket.changeSlideToNext).toBeCalled();
                expect(slideSwipingUpActionsBucket.addTransitionAndTransformZeroCurrentSlideSource).not.toBeCalled();
            });
        });
    });

    test('setting up swiping props', () => {
        swipingProps.isAfterSwipeAnimationRunning = undefined;
        swipingProps.swipedDifference = undefined;
        setUpAndCallRunActions();

        expect(swipingProps.isAfterSwipeAnimationRunning).toBe(true);

        expect(swipingProps.swipedDifference).toBe(0);
    });

    test('after timeout actions', () => {
        let setTimeoutParams;
        let removingTransitionIndex = -1;

        fsLightbox.data.sourcesCount = 4;
        const removeIfContains = jest.fn();
        classListManager.manageArrayElementAtIndex = (elementsArrayName, index) => {
            removingTransitionIndex++;
            if (elementsArrayName === SOURCES_HOLDERS && index === removingTransitionIndex) {
                return {
                    removeIfContains: removeIfContains
                }
            }
        };
        window.setTimeout = (...params) => {
            setTimeoutParams = params;
        };
        swipingProps.isAfterSwipeAnimationRunning = undefined;
        setUpAndCallRunActions();

        expect(setTimeoutParams[1]).toBe(ANIMATION_TIME);

        setTimeoutParams[0]();
        expect(removeIfContains).toHaveBeenNthCalledWith(4, TRANSFORM_TRANSITION_CLASS_NAME);
        expect(swipingProps.isAfterSwipeAnimationRunning).toBe(false);
    });
});
