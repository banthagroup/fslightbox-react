import { SourceAnimator } from "../../../../src/core/Animations/SourceAnimator";
import { ImageMock } from "../../../__mocks__/components/Sources/ProperSources/ImageMock";
import FsLightbox from "../../../../src";
import { testProps } from "../../../schemas/testVariables";
import {
    FADE_IN_CLASS_NAME,
    LONG_FADE_IN_CLASS_NAME,
    FADE_OUT_CLASS_NAME
} from "../../../../src/constants/CssConstants";

const fsLightboxInstance = new FsLightbox(testProps);
const sourceAnimator = new SourceAnimator(fsLightboxInstance);
const mockImage = new ImageMock(fsLightboxInstance);
mockImage.createImageMock();

describe('animateSourceFromSlide', () => {
    it('should attach fade out animation', () => {
        sourceAnimator.animateSourceFromSlide(1).fadeOut();
        expect(fsLightboxInstance.elements.sources[0].current.classList.contains(FADE_OUT_CLASS_NAME))
            .toBeTruthy();
    });

    it('should attach fade in animation', () => {
        sourceAnimator.animateSourceFromSlide(1).fadeIn();
        expect(fsLightboxInstance.elements.sources[0].current.classList.contains(FADE_IN_CLASS_NAME))
            .toBeTruthy();
    });

    it('should remove fade out animation', () => {
        sourceAnimator.animateSourceFromSlide(1).fadeOut();
        sourceAnimator.animateSourceFromSlide(1).removeFadeOut();
        expect(fsLightboxInstance.elements.sources[0].current.classList.contains(FADE_OUT_CLASS_NAME))
            .toBeFalsy();
    });


    describe('Removing fadeIn animation', () => {
        it('should fslightbox-fade-in, due to source has this this class', () => {
            sourceAnimator.animateSourceFromSlide(1).fadeIn();
            sourceAnimator.animateSourceFromSlide(1).removeFadeIn();
            expect(fsLightboxInstance.elements.sources[0].current.classList.contains(FADE_IN_CLASS_NAME))
                .toBeFalsy();
        });

        it('should fslightbox-fade-in-complete, due to source has this this class', () => {
            fsLightboxInstance.elements.sources[0].current.classList.add(LONG_FADE_IN_CLASS_NAME);
            sourceAnimator.animateSourceFromSlide(1).removeFadeIn();
            expect(fsLightboxInstance.elements.sources[0].current.classList.contains(LONG_FADE_IN_CLASS_NAME))
                .toBeFalsy();
        });

        it(`should remove both fslightbox-fade-in and fslightbox-fade-in-complete 
            (that case may happen when source which have fslightbox-fade-in-complete 
            after reopen is in stage and receives fslightbox-fade-in`, () => {
            fsLightboxInstance.elements.sources[0].current.classList.add(LONG_FADE_IN_CLASS_NAME);
            fsLightboxInstance.elements.sources[0].current.classList.add(FADE_IN_CLASS_NAME);
            sourceAnimator.animateSourceFromSlide(1).removeFadeIn();
            expect(fsLightboxInstance.elements.sources[0].current.classList.contains(LONG_FADE_IN_CLASS_NAME))
                .toBeFalsy();
            expect(fsLightboxInstance.elements.sources[0].current.classList.contains(FADE_IN_CLASS_NAME))
                .toBeFalsy();
        });
    });
});

