import { initializeLightbox } from "./initializeLightbox";
import * as createSourcesObject from "../../sources/creating/createSources";

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

test('init actions', () => {
    initializeLightbox(fsLightbox);
    expect(fsLightbox.data.isInitialized).toBe(true);
    expect(createSourcesObject.createSources).toBeCalledWith(fsLightbox);
    expect(eventsDispatcher.dispatch).toBeCalledWith('onInit');
});
