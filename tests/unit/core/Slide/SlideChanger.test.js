import { SlideChanger } from "../../../../src/core/Slide/SlideChanger";
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();
/** @var  { SlideChanger } slideChanger */
let slideChanger;
let sourceHolders;

describe('changeSlideTo', () => {
    beforeEach(() => {
        fsLightboxMock.setAllSourcesToDivs();
        sourceHolders = fsLightboxMock.setAllSourceHoldersToDivs().getSourceHoldersArray();
        fsLightbox.state.slide = 1;
        slideChanger = new SlideChanger(fsLightbox);
    });

    it('should change slide', () => {
        slideChanger.changeSlideTo(2);
        expect(fsLightbox.state.slide).toEqual(2);
    });

    it('should transform stage sourceHolders with timeout', () => {
        window.innerWidth = 100;
        jest.useFakeTimers();
        slideChanger.changeSlideTo(2);
        jest.runAllTimers();
        expect(sourceHolders[0].current.style.transform).toEqual('translate(-130px,0)');
        expect(sourceHolders[1].current.style.transform).toEqual('translate(0px,0)');
        expect(sourceHolders[2].current.style.transform).toEqual('translate(130px,0)');
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


    describe('removing fade out from previous and next slide after timeout', () => {
        let animateSourceFromSlideMockProperty;

        beforeEach(() => {
            jest.useFakeTimers();
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


        describe('not calling removeFadeOut (due to slide was changed during fade out animation)', () => {
            beforeEach(() => {
                // changing slide before running timers(it mocks changing slide during animation)
                slideChanger.changeSlideTo(3);
                jest.runOnlyPendingTimers();
            });

            it('should not call removeFadeOut for previous slide', () => {
                const animateSourceFromSlideCalls = [];
                let wasRemoveFadeOutCalled = false;
                animateSourceFromSlideMockProperty.calls.forEach((params, index) => {
                    // we are testing only first change slide because we are running in the same time both timers
                    // so even if first would shown that removeFadeOut is not called second would say that is was called
                    // anyway
                    if(index > animateSourceFromSlideMockProperty.calls.length / 2) {
                        return;
                    }
                    // previous slide number ( current slide - 2 )
                    if (params[0] === 1) {
                        animateSourceFromSlideCalls.push(animateSourceFromSlideMockProperty.results[index].value);
                    }
                });
                for (let animateSourceFromSlide of animateSourceFromSlideCalls) {
                    if (animateSourceFromSlide.removeFadeOut.mock.calls.length === 1) {
                        wasRemoveFadeOutCalled = true;
                    }
                }
                expect(wasRemoveFadeOutCalled).toBeFalsy();
            });

            it('should not call removeFadeOut for next slide', () => {
                const animateSourceFromSlideCalls = [];
                let wasRemoveFadeOutCalled = false;
                animateSourceFromSlideMockProperty.calls.forEach((params, index) => {
                    // we are testing only first change slide because we are running in the same time both timers
                    // so even if first would shown that removeFadeOut is not called second would say that is was called
                    // anyway
                    if(index > animateSourceFromSlideMockProperty.calls.length / 2) {
                        return;
                    }
                    // previous slide number ( current slide - 3 )
                    if (params[0] === 3) {
                        animateSourceFromSlideCalls.push(animateSourceFromSlideMockProperty.results[index].value);
                    }
                });
                for (let animateSourceFromSlide of animateSourceFromSlideCalls) {
                    if (animateSourceFromSlide.removeFadeOut.mock.calls.length === 1) {
                        wasRemoveFadeOutCalled = true;
                    }
                }
                expect(wasRemoveFadeOutCalled).toBeFalsy();
            });
        });


        describe('calling removeFadeOut', () => {
            beforeEach(() => {
                jest.runAllTimers();
            });

            it('should call removeFadeOut for previous slide', () => {
                const animateSourceFromSlideCalls = [];
                let wasRemoveFadeOutCalled = false;
                animateSourceFromSlideMockProperty.calls.forEach((params, index) => {
                    // previous slide
                    if (params[0] === 1) {
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

            it('should call removeFadeOut for next slide', () => {
                const animateSourceFromSlideCalls = [];
                let wasRemoveFadeOutCalled = false;
                animateSourceFromSlideMockProperty.calls.forEach((params, index) => {
                    // next slide
                    if (params[0] === 3) {
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
        });
    });
});