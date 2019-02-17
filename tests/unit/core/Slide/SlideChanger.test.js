import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { SlideChanger } from "../../../../src/core/Slide/SlideChanger";

const mock = new FsLightboxMock();
const fsLightboxInstance = mock.getInstance();
fsLightboxInstance.slide = 1;

describe('changeSlide', () => {
    const slideChanger = new SlideChanger(fsLightboxInstance);
    slideChanger.animate = jest.fn();
    const testTransformStageHolders = {
        withTimeout: jest.fn()
    };
    fsLightboxInstance.sourceHoldersTransformer.transformStageSources = () => {
        return testTransformStageHolders;
    };
    slideChanger.changeSlide(2);

    it('should change slide', () => {
        expect(fsLightboxInstance.slide).toEqual(2);
    });

    it('should call transformStageSources with timeout', () => {
        expect(testTransformStageHolders.withTimeout).toBeCalled();
    });

    it('should call animate', () => {
        expect(slideChanger.animate).toBeCalled();
    });
});


describe('animate', () => {
    const slideChanger = new SlideChanger(fsLightboxInstance);
    const testAnimateSourceFromSlide = {
        fadeOut: jest.fn(),
        fadeIn: jest.fn(),
        removeFadeOut: jest.fn(),
        removeFadeIn: jest.fn()
    };
    fsLightboxInstance.sourceAnimator.animateSourceFromSlide = () => {
        return testAnimateSourceFromSlide;
    };
    slideChanger.animate();
    it('should call removeFadeIn', () => {
        expect(testAnimateSourceFromSlide.removeFadeIn).toBeCalled();
    });

    it('should call fadeOut', () => {
        expect(testAnimateSourceFromSlide.fadeOut).toBeCalled();
    });

    it('should call fadeIn', () => {
        expect(testAnimateSourceFromSlide.fadeIn).toBeCalled();
    });

    it('should call removeFadeOut', () => {
        expect(testAnimateSourceFromSlide.removeFadeOut).toBeCalled();
    });
});
