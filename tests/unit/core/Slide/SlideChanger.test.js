import { SlideChanger } from "../../../../src/core/Slide/SlideChanger";
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();
/** @var  { SlideChanger } slideChanger */
let slideChanger;
let sourceHolders;

beforeEach(() => {
    fsLightboxMock.setAllSourcesToDivs();
    sourceHolders = fsLightboxMock.setAllSourceHoldersToDivs().getSourceHoldersArray();
    fsLightbox.state.slide = 1;
});

describe('changeSlideTo', () => {
    describe('changing slide', () => {
        beforeEach(() => {
            slideChanger = new SlideChanger(fsLightbox);
        });

        it('should change slide', () => {
            slideChanger.changeSlideTo(2);
            expect(fsLightbox.state.slide).toEqual(2);
        });
    });

    describe('transforming stage source holders with timeout', () => {
        let withTimeoutMock;

        beforeEach(() => {
            withTimeoutMock = jest.fn();
            fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders = jest.fn(() => ({
                withTimeout: withTimeoutMock
            }));
            slideChanger = new SlideChanger(fsLightbox);
            slideChanger.changeSlideTo(2);
        });

        it('should call transformStageSourceHolders', () => {
            expect(fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders.mock.calls.length).toEqual(1);
        });

        it('should call with timeout', () => {
            expect(withTimeoutMock).toBeCalled();
        });
    });

    describe('animating source holders', () => {
        let animateSourceFromSlideMockProperty;

        beforeEach(() => {
            fsLightbox.core.sourceAnimator.animateSourceFromSlide = jest.fn(() => ({
                removeFadeIn: jest.fn(),
                fadeOut: jest.fn(),
                removeFadeOut: jest.fn(),
                fadeIn: jest.fn()
            }));
            animateSourceFromSlideMockProperty = fsLightbox.core.sourceAnimator.animateSourceFromSlide.mock;
            slideChanger = new SlideChanger(fsLightbox);
            slideChanger.changeSlideTo(2);
        });

        it('should call removeFadeIn for previous slide number', () => {
            const animateSourceFromSlideCalls = [];
            let wasRemoveFadeInCalled;
            // there are at least two calls of animateSourceFromSlide for one slide number so to check if removeFadeIn
            // was called with previous slide number we need to iterator through each call of animateSourceFromSlide
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
            fsLightbox.core.sourceAnimator.removeFadeOutFromAllSources = jest.fn();
            slideChanger = new SlideChanger(fsLightbox);
            jest.useFakeTimers();
        });

        describe("not calling removeFadeOutFromAllSources due to previous timeout hasn't finish", () => {
            beforeEach(() => {
                slideChanger.changeSlideTo(2);
                slideChanger.changeSlideTo(3);
                jest.runAllTimers();
            });

            it('should call removeFadeOutFromAllSources only 1 time even if slide was changed two times', () => {
                expect(fsLightbox.core.sourceAnimator.removeFadeOutFromAllSources).toBeCalledTimes(1);
            });
        });

        describe('calling remove fadeOutFromAllSources', () => {
            beforeEach(() => {
                slideChanger.changeSlideTo(2);
                jest.runAllTimers();
            });

            it('should call removeFadeOutFromAllSources', () => {
                expect(fsLightbox.core.sourceAnimator.removeFadeOutFromAllSources).toBeCalled();
            });
        });
    });
});