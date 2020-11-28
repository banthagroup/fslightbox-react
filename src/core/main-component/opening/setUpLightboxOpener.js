import { createSources } from "../../sources/creating/createSources";
import { getInitialCurrentIndex } from "../../stage/getInitialCurrentIndex";
import { fillSourceMainWrapperTransformersCollection } from "../../collections/fillSourceMainWrapperTransformersCollection";
import { setUpCore } from "../../setUpCore";
import { createRefsArray } from "../../../helpers/arrays/createRefsArray";

export function setUpLightboxOpener(fsLightbox) {
    const {
        componentsServices: { isLightboxOpenManager },
        core: { eventsDispatcher, lightboxOpener: self, lightboxOpenActioner },
        data,
        elements,
        stageIndexes
    } = fsLightbox;

    self.openLightbox = () => {
        eventsDispatcher.dispatch('onShow');
        isLightboxOpenManager.set(true, lightboxOpenActioner.runInitializedLightboxActions);
    };

    self.initializeAndOpenLightbox = () => {
        data.isInitialized = true;

        stageIndexes.current = getInitialCurrentIndex(fsLightbox);

        elements.sourceAnimationWrappers = createRefsArray(fsLightbox);
        elements.sourceMainWrappers = createRefsArray(fsLightbox);
        elements.sources = createRefsArray(fsLightbox);

        fillSourceMainWrapperTransformersCollection(fsLightbox);

        setUpCore(fsLightbox);

        eventsDispatcher.dispatch('onInit');

        isLightboxOpenManager.set(true, () => {
            lightboxOpenActioner.runInitializedLightboxActions();
            createSources(fsLightbox);
        });
    };
}
