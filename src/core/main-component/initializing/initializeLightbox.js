import { createSources } from "../../sources/creating/createSources";

export function initializeLightbox(fsLightbox) {
    const {
        data,
        core: {
            eventsDispatcher
        }
    } = fsLightbox;

    data.isInitialized = true;
    createSources(fsLightbox);
    eventsDispatcher.dispatch('onInit');
}
