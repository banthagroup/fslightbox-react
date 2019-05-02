import { setUpLightboxInitializer } from "../../../src/core/main-component/setUpLightboxInitializer";
import { ON_INIT } from "../../../src/constants/eventsConstants";

const lightboxInitializer = {};
const fsLightbox = {
    data: {
        isInitialized: false
    },
    eventsDispatcher: {
        dispatch: jest.fn()
    },
    core: {
        sourcesFactory: {
            createSourcesAndAddThemToSourcesComponentsArray: jest.fn()
        },
        lightboxInitializer: lightboxInitializer
    }
};

setUpLightboxInitializer(fsLightbox);

beforeAll(() => {
    lightboxInitializer.initialize();
});

describe('setting isInitialized to true', () => {
    it('should set isInitialized to true', () => {
        expect(fsLightbox.data.isInitialized).toBe(true);
    });
});

describe('dispatching onInit event', () => {
    it('should call dispatch with onInin', () => {
        expect(fsLightbox.eventsDispatcher.dispatch).toBeCalledWith(ON_INIT);
    });
});

describe('calling right methods', () => {
    it('should call createSourcesAndAddThemToSourcesComponentsArray', () => {
        expect(fsLightbox.core.sourcesFactory.createSourcesAndAddThemToSourcesComponentsArray).toBeCalled();
    });
});