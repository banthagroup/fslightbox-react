import { SourceAnimator } from "../../../../src/core/Animations/SourceAnimator";
import { ImageMock } from "../../../__mocks__/components/Sources/ProperSources/ImageMock";
import FsLightbox from "../../../../src";
import { testProps } from "../../../schemas/testVariables";

const fsLightboxInstance = new FsLightbox(testProps);
const sourceAnimator = new SourceAnimator(fsLightboxInstance);
const mockImage = new ImageMock(fsLightboxInstance);
mockImage.createImageMock();

describe('animateSourceFromSlide', () => {
    it('should attach fade out animation', () => {
        sourceAnimator.animateSourceFromSlide(1).fadeOut();
        expect(fsLightboxInstance.elements.sources[0].current.classList.contains('fslightbox-fade-out-class'))
            .toBeTruthy();
    });

    it('should attach fade in animation', () => {
        sourceAnimator.animateSourceFromSlide(1).fadeIn();
        expect(fsLightboxInstance.elements.sources[0].current.classList.contains('fslightbox-fade-in-class'))
            .toBeTruthy();
    });

    it('should remove fade out animation', () => {
        sourceAnimator.animateSourceFromSlide(1).fadeOut();
        sourceAnimator.animateSourceFromSlide(1).removeFadeOut();
        expect(fsLightboxInstance.elements.sources[0].current.classList.contains('fslightbox-fade-out-class'))
            .toBeFalsy();
    });


    describe('Removing fadeIn animation', () => {
        it('should remove fade in animation when source had fslightbox-fade-in-class', () => {
            sourceAnimator.animateSourceFromSlide(1).fadeIn();
            sourceAnimator.animateSourceFromSlide(1).removeFadeIn();
            expect(fsLightboxInstance.elements.sources[0].current.classList.contains('fslightbox-fade-in-class'))
                .toBeFalsy();
        });

        it('should remove fade in animation when source had fslightbox-fade-in-complete', () => {
            fsLightboxInstance.elements.sources[0].current.classList.add('fslightbox-fade-in-complete');
            sourceAnimator.animateSourceFromSlide(1).removeFadeIn();
            expect(fsLightboxInstance.elements.sources[0].current.classList.contains('fslightbox-fade-in-complete'))
                .toBeFalsy();
        });
    });
});

