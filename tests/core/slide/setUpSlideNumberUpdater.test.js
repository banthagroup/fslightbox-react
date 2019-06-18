import { setUpSlideNumberUpdater } from '../../../src/core/slide/setUpSlideNumberUpdater';

const fsLightbox = {
    data: {
        sourcesCount: 0,
    },
    componentsStates: {
        slideNumberUpdater: {},
    },
    core: {
        slideNumberUpdater: {}
    }
};
const slideNumberUpdater = fsLightbox.core.slideNumberUpdater;
const slideNumberUpdaterState = fsLightbox.componentsStates.slideNumberUpdater;

describe('sourcesCount > 1', () => {
    beforeAll(() => {
        fsLightbox.data.sourcesCount = 2;
        slideNumberUpdaterState.set = jest.fn();
        slideNumberUpdaterState.get = () => false;
        setUpSlideNumberUpdater(fsLightbox);
        slideNumberUpdater.updateSlideNumber();
    });

    it('should call slideNumberUpdaterStage set with opposite of get return value', () => {
        expect(slideNumberUpdaterState.set).toBeCalledWith(true);
        slideNumberUpdaterState.get = () => true;
        slideNumberUpdater.updateSlideNumber();
        expect(slideNumberUpdaterState.set).toBeCalledWith(false)
    });
});

describe('sourcesCount = 1 - updateSlideNumber should be method which not od anything', () => {
    beforeAll(() => {
        fsLightbox.data.sourcesCount = 1;
        // if there is only one slide there is no SlideNumber component so there is not state manager
        slideNumberUpdaterState.set = undefined;
        slideNumberUpdaterState.get = undefined;
        setUpSlideNumberUpdater(fsLightbox);
    });

    it('should not throw error', () => {
        expect(slideNumberUpdater.updateSlideNumber).not.toThrowError();
    });
});
