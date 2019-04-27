import { LightboxInitializer } from "../../../src/core/main-component/LightboxInitializer";

const fsLightbox = {
    data: {
        isInitialized: false
    },
    core: {
        sourcesFactory: {
            createSourcesAndAddThemToSourcesComponentsArray: jest.fn()
        }
    }
};

const lightboxInitializer = new LightboxInitializer(fsLightbox);

describe('setting isInitialized to true', () => {
    beforeAll(() => {
        lightboxInitializer.initialize();
    });

    it('should set isInitialized to true', () => {
        expect(fsLightbox.data.isInitialized).toBe(true);
    });
});

describe('calling right methods', () => {
    beforeAll(() => {
        lightboxInitializer.initialize();
    });

    it('should call createSourcesAndAddThemToSourcesComponentsArray', () => {
        expect(fsLightbox.core.sourcesFactory.createSourcesAndAddThemToSourcesComponentsArray).toBeCalled();
    });
});