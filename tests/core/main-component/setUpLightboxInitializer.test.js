import { setUpLightboxInitializer } from "../../../src/core/main-component/setUpLightboxInitializer";

const lightboxInitializer = {};
const fsLightbox = {
    data: {
        isInitialized: false
    },
    core: {
        sourcesFactory: {
            createSourcesAndAddThemToSourcesComponentsArray: jest.fn()
        },
        lightboxInitializer: lightboxInitializer
    }
};

setUpLightboxInitializer(fsLightbox);

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