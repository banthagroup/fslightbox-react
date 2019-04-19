import { SourceAnimator } from "../../../src/core/animations/SourceAnimator";
import {
    FADE_IN_CLASS_NAME,
    LONG_FADE_IN_CLASS_NAME,
    FADE_OUT_CLASS_NAME
} from "../../../src/constants/cssConstants";

const fsLightbox = {
    elements: {
        sources: [
            {
                current: document.createElement('div')
            }
        ]
    }
};
const sourceAnimator = new SourceAnimator(fsLightbox);

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

