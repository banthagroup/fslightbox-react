import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { SourceAnimator } from "../../../../src/core/Animations/SourceAnimator";
import { ImageMock } from "../../../__mocks__/components/imageMock";

const mock = new FsLightboxMock();
const fsLightboxInstance = mock.getInstance();
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

    it('should remove fade in animation', () => {
        sourceAnimator.animateSourceFromSlide(1).fadeIn();
        sourceAnimator.animateSourceFromSlide(1).removeFadeIn();
        expect(fsLightboxInstance.elements.sources[0].current.classList.contains('fslightbox-fade-in-class'))
            .toBeFalsy();
    });
});

