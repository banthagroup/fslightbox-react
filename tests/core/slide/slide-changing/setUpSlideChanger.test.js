import { setUpSlideChanger } from "../../../../src/core/slide/slide-changing/setUpSlideChanger";
import * as getRemoveFadeOutTimeoutQueueObject
    from "../../../../src/core/slide/slide-changing/getRemoveFadeOutTimeoutQueue";
import * as getPreviousSourceNegativeTransformTimeoutQueueObject
    from "../../../../src/core/slide/slide-changing/getPreviousSourceNegativeTransformTimeoutQueue";

const slideChanger = {};
let slide;
const sourceAnimator = {
    animateSourceFromSlide: () => ({
        removeFadeIn: () => {},
        removeFadeOut: () => {},
        fadeIn: () => {},
        fadeOut: () => {}
    }),
    removeFadeOutFromAllSources: () => {},
};
const removeFadeOutQueue = {
    startTimeout: () => {}
};
const previousSourceNegativeTransformQueue = {
    actionCallConditionFunc: () => {},
    action: () => {},
    startTimeout: () => {}
};
const fsLightbox = {
    componentsStates: {
        slide: {
            get: () => slide,
            set: (number) => slide = number,
            onUpdate: () => {},
        }
    },
    core: {
        stage: {
            isSourceInStage: () => {}
        },
        sourceAnimator: sourceAnimator,
        sourceHoldersTransformer: {
            transformStageSourceHolders: () => {}
        },
        slideChanger: slideChanger
    }
};

getRemoveFadeOutTimeoutQueueObject.getRemoveFadeOutTimeoutQueue = jest.fn(() => removeFadeOutQueue);
getPreviousSourceNegativeTransformTimeoutQueueObject.getPreviousSourceNegativeTransformTimeoutQueue
    = jest.fn(() => previousSourceNegativeTransformQueue);
setUpSlideChanger(fsLightbox);

const setSlideTo1AndCallChangeSlideTo = (newSlide) => {
    slide = 1;
    slideChanger.changeSlideTo(newSlide);
};

describe('constructor', () => {
    describe('queues', () => {
        describe('getRemoveFadeOutTimeoutQueue', () => {
            it('should call getRemoveFadeOutQueue with fsLightbox', () => {
                expect(getRemoveFadeOutTimeoutQueueObject.getRemoveFadeOutTimeoutQueue).toBeCalledWith(fsLightbox);
            });
        });

        describe('getPreviousSourceNegativeTransformTimeoutQueue', () => {
            it('should call getPreviousSourceNegativeTransformTimeoutQueue', () => {
                expect(getPreviousSourceNegativeTransformTimeoutQueueObject.getPreviousSourceNegativeTransformTimeoutQueue)
                    .toBeCalledWith(fsLightbox);
            });
        });
    });
});

describe('changeSlideTo', () => {
    describe('slide state', () => {
        describe('changing slide', () => {
            beforeAll(() => {
                setSlideTo1AndCallChangeSlideTo(2);
            });

            it('should change slide to 2', () => {
                expect(slide).toEqual(2);
            });
        });

        describe('onUpdate', () => {
            let withTimeout;

            beforeAll(() => {
                withTimeout = jest.fn();
                fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders = jest.fn(() => ({
                    withTimeout: withTimeout
                }));
                setSlideTo1AndCallChangeSlideTo(2);
                // onUpdate is called by react during runtime so we need to simulate its call
                fsLightbox.componentsStates.slide.onUpdate();
            });

            it('should call transformStageSourceHolders', () => {
                expect(fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders).toBeCalled();
            });

            it('should call withTimeout', () => {
                expect(withTimeout).toBeCalled();
            });
        });
    });

    describe('animating sources holders', () => {
        let animateSourceFromSlideMockProperty;

        beforeEach(() => {
            sourceAnimator.animateSourceFromSlide = jest.fn(() => ({
                removeFadeIn: jest.fn(),
                fadeOut: jest.fn(),
                removeFadeOut: jest.fn(),
                fadeIn: jest.fn()
            }));
            animateSourceFromSlideMockProperty = fsLightbox.core.sourceAnimator.animateSourceFromSlide.mock;
            setSlideTo1AndCallChangeSlideTo(2);
        });

        it('should call removeFadeIn for previous slide number', () => {
            const animateSourceFromSlideCalls = [];
            let wasRemoveFadeInCalled;
            // there are at least two calls of animateSourceFromSlide for one slide number so to check if removeFadeIn
            // was called with previous slide number we need to iterator through each call of animateSourceFromSlide,
            // add this call to array and then check at least one call of removeFadeIn
            animateSourceFromSlideMockProperty.calls.forEach((params, index) => {
                // if first param is 1 it means that function was called with previous slide number
                if (params[0] === 1) {
                    animateSourceFromSlideCalls.push(animateSourceFromSlideMockProperty.results[index].value);
                }
            });
            for (let animateSourceFromSlide of animateSourceFromSlideCalls) {
                if (animateSourceFromSlide.removeFadeIn.mock.calls.length === 1) {
                    wasRemoveFadeInCalled = true;
                }
            }
            expect(wasRemoveFadeInCalled).toBeTruthy();
        });

        it('should call fadeOut for previous slide number', () => {
            const animateSourceFromSlideCalls = [];
            let wasFadeOutCalled;
            animateSourceFromSlideMockProperty.calls.forEach((params, index) => {
                // previous slide number
                if (params[0] === 1) {
                    animateSourceFromSlideCalls.push(animateSourceFromSlideMockProperty.results[index].value);
                }
            });
            for (let animateSourceFromSlide of animateSourceFromSlideCalls) {
                if (animateSourceFromSlide.fadeOut.mock.calls.length === 1) {
                    wasFadeOutCalled = true;
                }
            }
            expect(wasFadeOutCalled).toBeTruthy();
        });


        it('should call removeFadeOut for current slide number', () => {
            const animateSourceFromSlideCalls = [];
            let wasRemoveFadeOutCalled;
            animateSourceFromSlideMockProperty.calls.forEach((params, index) => {
                // current slide number
                if (params[0] === 2) {
                    animateSourceFromSlideCalls.push(animateSourceFromSlideMockProperty.results[index].value);
                }
            });
            for (let animateSourceFromSlide of animateSourceFromSlideCalls) {
                if (animateSourceFromSlide.removeFadeOut.mock.calls.length === 1) {
                    wasRemoveFadeOutCalled = true;
                }
            }
            expect(wasRemoveFadeOutCalled).toBeTruthy();
        });

        it('should call fadeIn for current slide number', () => {
            const animateSourceFromSlideCalls = [];
            let wasFadeInCalled;
            animateSourceFromSlideMockProperty.calls.forEach((params, index) => {
                // current slide number
                if (params[0] === 2) {
                    animateSourceFromSlideCalls.push(animateSourceFromSlideMockProperty.results[index].value);
                }
            });
            for (let animateSourceFromSlide of animateSourceFromSlideCalls) {
                if (animateSourceFromSlide.fadeIn.mock.calls.length === 1) {
                    wasFadeInCalled = true;
                }
            }
            expect(wasFadeInCalled).toBeTruthy();
        });
    });

    describe('removeFadeOutFromAllSourcesAfterTimeout', () => {
        beforeAll(() => {
            removeFadeOutQueue.startTimeout = jest.fn();
            slideChanger.changeSlideTo(1);
        });

        it('should call startTimeout', () => {
            expect(removeFadeOutQueue.startTimeout).toBeCalled();
        });
    });

    describe('ifPreviousSlideIsNotInStageTransformItNegativeAfterTimeout', () => {
        let negative;

        beforeAll(() => {
            negative = jest.fn();
            // previous slide number is 2 so previous slide index will be 1
            slide = 2;
            previousSourceNegativeTransformQueue.actionCallConditionFunc = null;
            fsLightbox.core.stage.isSourceInStage = jest.fn(() => true);
            previousSourceNegativeTransformQueue.action = null;
            fsLightbox.core.sourceHoldersTransformer.transformSourceHolderAtIndex = jest.fn(() => ({
                negative: negative
            }));
            previousSourceNegativeTransformQueue.startTimeout = jest.fn();
            slideChanger.changeSlideTo(3);
        });

        describe(`setting actionCallConditionFunc to function that 
                returns negation of isSourceInStage call return value with previous slide index`, () => {
            let condition;

            beforeAll(() => {
                condition = previousSourceNegativeTransformQueue.actionCallConditionFunc();
            });

            it('should call isSourceInStage with previous slide index', () => {
                expect(fsLightbox.core.stage.isSourceInStage).toBeCalledWith(1);
            });

            it('should return false (negation os isSourceInStage)', () => {
                expect(condition).toBe(false);
            });
        });

        describe('setting action to method that calls transformSourceHolderAtIndex negatively', () => {
            beforeAll(() => {
                previousSourceNegativeTransformQueue.action();
            });

            it('should call transformSourceHolderAtIndex with previous slide index', () => {
                expect(fsLightbox.core.sourceHoldersTransformer.transformSourceHolderAtIndex).toBeCalledWith(1);
            });

            it('should call negative', () => {
                expect(negative).toBeCalled();
            });
        });

        describe('calling startTimeout', () => {
            it('should call startTimeout', () => {
                expect(previousSourceNegativeTransformQueue.startTimeout).toBeCalled();
            });
        });
    });
});
