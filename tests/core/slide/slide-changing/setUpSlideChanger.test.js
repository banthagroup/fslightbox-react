import { setUpSlideChanger } from "../../../src/core/slide/slide-changing/setUpSlideChanger";

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
const fsLightbox = {
    core: {
        sourceAnimator: sourceAnimator,
        sourceHoldersTransformer: {
            transformStageSourceHolders: () => {}
        },
        slideChanger: slideChanger
    },
    componentsStates: {
        slide: {
            get: () => slide,
            set: (number) => slide = number,
            onUpdate: () => {},
        }
    }
};

setUpSlideChanger(fsLightbox);

const setSlideTo1AndCallChangeSlideTo = (newSlide) => {
    slide = 1;
    slideChanger.changeSlideTo(newSlide);
};

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


    describe('removing fade out from all sources after timeout', () => {
        beforeEach(() => {
            sourceAnimator.removeFadeOutFromAllSources = jest.fn();
            setUpSlideChanger(fsLightbox);
            jest.useFakeTimers();
        });

        describe("not calling removeFadeOutFromAllSources due to previous timeout hasn't finish", () => {
            beforeEach(() => {
                slideChanger.changeSlideTo(2);
                slideChanger.changeSlideTo(3);
                jest.runAllTimers();
            });

            it('should call removeFadeOutFromAllSources only 1 time even if slide was changed two times', () => {
                expect(sourceAnimator.removeFadeOutFromAllSources).toBeCalledTimes(1);
            });
        });

        describe('calling remove fadeOutFromAllSources', () => {
            beforeEach(() => {
                slideChanger.changeSlideTo(2);
                jest.runAllTimers();
            });

            it('should call removeFadeOutFromAllSources', () => {
                expect(sourceAnimator.removeFadeOutFromAllSources).toBeCalled();
            });
        });
    });
});
