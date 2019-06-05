import { ON_INIT } from "../../../constants/eventsConstants";
import { createSources } from "../../sources/creating/createSources";

export function initializeLightbox(fsLightbox) {
    const {
        data,
        eventsDispatcher: {
            dispatch
        }
    } = fsLightbox;

    data.isInitialized = true;
    createSources(fsLightbox);
    dispatch(ON_INIT);
}
