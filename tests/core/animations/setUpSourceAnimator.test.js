import {
    FADE_IN_CLASS_NAME,
    LONG_FADE_IN_CLASS_NAME,
    FADE_OUT_CLASS_NAME
} from "../../../src/constants/cssConstants";
import { setUpSourceAnimator } from "../../../src/core/animations/setUpSourceAnimator";

const sourceAnimator = {};
const fsLightbox = {
    elements: {
        sources: [
            {
                current: document.createElement('div')
            }
        ]
    },
    core: {
        sourceAnimator: sourceAnimator
    }
};

setUpSourceAnimator(fsLightbox);

describe('animateSourceFromSlide', () => {
    it('should attach fade out animation', () => {
        sourceAnimator.animateSourceFromSlide(1).fadeOut();
        expect(fsLightbox.elements.sources[0].current.classList.contains(FADE_OUT_CLASS_NAME))
            .toBeTruthy();
    });

    it('should attach fade in animation', () => {
        sourceAnimator.animateSourceFromSlide(1).fadeIn();
        expect(fsLightbox.elements.sources[0].current.classList.contains(FADE_IN_CLASS_NAME))
            .toBeTruthy();
    });

    it('should remove fade out animation', () => {
        sourceAnimator.animateSourceFromSlide(1).fadeOut();
        sourceAnimator.animateSourceFromSlide(1).removeFadeOut();
        expect(fsLightbox.elements.sources[0].current.classList.contains(FADE_OUT_CLASS_NAME))
            .toBeFalsy();
    });

    it('should add long fade in animation', () => {
        sourceAnimator.animateSourceFromSlide(1).longFadeIn();
        expect(fsLightbox.elements.sources[0].current.classList.contains(LONG_FADE_IN_CLASS_NAME)).toBe(true);
    });


    describe('Removing fadeIn animation', () => {
        it('should fslightbox-fade-in, due to sources has this this class', () => {
            sourceAnimator.animateSourceFromSlide(1).fadeIn();
            sourceAnimator.animateSourceFromSlide(1).removeFadeIn();
            expect(fsLightbox.elements.sources[0].current.classList.contains(FADE_IN_CLASS_NAME))
                .toBeFalsy();
        });

        it('should fslightbox-fade-in-complete, due to sources has this this class', () => {
            fsLightbox.elements.sources[0].current.classList.add(LONG_FADE_IN_CLASS_NAME);
            sourceAnimator.animateSourceFromSlide(1).removeFadeIn();
            expect(fsLightbox.elements.sources[0].current.classList.contains(LONG_FADE_IN_CLASS_NAME))
                .toBeFalsy();
        });

        it(`should remove both fslightbox-fade-in and fslightbox-fade-in-complete 
            (that case may happen when source which have fslightbox-fade-in-complete 
            after reopen is in stage and receives fslightbox-fade-in`, () => {
            fsLightbox.elements.sources[0].current.classList.add(LONG_FADE_IN_CLASS_NAME);
            fsLightbox.elements.sources[0].current.classList.add(FADE_IN_CLASS_NAME);
            sourceAnimator.animateSourceFromSlide(1).removeFadeIn();
            expect(fsLightbox.elements.sources[0].current.classList.contains(LONG_FADE_IN_CLASS_NAME))
                .toBeFalsy();
            expect(fsLightbox.elements.sources[0].current.classList.contains(FADE_IN_CLASS_NAME))
                .toBeFalsy();
        });
    });
});

describe('removeFadeOutFromAllSources', () => {
    beforeAll(() => {
        // as in code is for we will be testing for at least to times
        fsLightbox.elements.sources = [
            {
                current: document.createElement('div')
            },
            {
                current: document.createElement('div')
            }
        ];

        fsLightbox.elements.sources[0].current.classList.contains = jest.fn(() => false);
        fsLightbox.elements.sources[1].current.classList.contains = jest.fn(() => true);

        fsLightbox.elements.sources[0].current.classList.remove = jest.fn();
        fsLightbox.elements.sources[1].current.classList.remove = jest.fn();

        setUpSourceAnimator(fsLightbox);
        sourceAnimator.removeFadeOutFromAllSources();
    });

    describe('first source (not contains fade out)', () => {
        it('should call contains with fade out class name', () => {
            expect(fsLightbox.elements.sources[0].current.classList.contains).toBeCalledWith(FADE_OUT_CLASS_NAME);
        });

        it('should not call remove', () => {
            expect(fsLightbox.elements.sources[0].current.classList.remove).not.toBeCalled();
        });
    });

    describe('second source (contains fade out)', () => {
        it('should call contains with fade out class name', () => {
            expect(fsLightbox.elements.sources[1].current.classList.contains).toBeCalledWith(FADE_OUT_CLASS_NAME);
        });

        it('should call remove with fade out class name', () => {
            expect(fsLightbox.elements.sources[1].current.classList.remove).toBeCalledWith(FADE_OUT_CLASS_NAME);
        });
    });
});

