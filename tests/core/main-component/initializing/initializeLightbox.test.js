import { initializeLightbox } from "../../../../src/core/main-component/initializing/initializeLightbox";
import { ON_INIT } from "../../../../src/constants/eventsConstants";
import * as createSourcesObject from "../../../../src/core/sources/creating/createSources";

const fsLightbox = {
    data: {
        isInitialized: false
    },
    core: {
        eventsDispatcher: {
            dispatch: jest.fn()
        }
    }
};

const eventsDispatcher = fsLightbox.core.eventsDispatcher;
createSourcesObject.createSources = jest.fn();

beforeAll(() => {
    initializeLightbox(fsLightbox);
});

describe('setting isInitialized to true', () => {
    it('should set isInitialized to true', () => {
        expect(fsLightbox.data.isInitialized).toBe(true);
    });
});

describe('creating sources', () => {
    it('should call createSources', () => {
        expect(createSourcesObject.createSources).toBeCalledWith(fsLightbox);
    });
});

describe('dispatching onInit event', () => {
    it('should call dispatch with on init', () => {
        expect(eventsDispatcher.dispatch).toBeCalledWith(ON_INIT);
    });
});
