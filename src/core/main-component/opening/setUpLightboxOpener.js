import { createSources } from "../../sources/creating/createSources";
import { setUpCore } from "../../setUpCore";
import { createRefsArray } from "../../../helpers/arrays/createRefsArray";
import { fillIndexedCollection } from "../../collections/fillIndexedCollection";
import { SourceMainWrapperTransformer } from "../../transforms/SourceMainWrapperTransformer";
import { SourceLoadHandler } from "../../sources/SourceLoadHandler";

export function setUpLightboxOpener(fsLightbox) {
    const {
        componentsServices: { isLightboxOpenManager },
        core: { eventsDispatcher, lightboxOpener: self, lightboxOpenActioner },
        data,
        elements
    } = fsLightbox;

    self.openLightbox = () => {
        eventsDispatcher.dispatch('onShow');
        fillIndexedCollection(fsLightbox, 'sourceLoadHandlers', SourceLoadHandler);
        isLightboxOpenManager.set(true, lightboxOpenActioner.runInitializedLightboxActions);
    };

    self.initializeAndOpenLightbox = () => {
        data.isInitialized = true;

        elements.sourceAnimationWrappers = createRefsArray(fsLightbox);
        elements.sourceMainWrappers = createRefsArray(fsLightbox);
        elements.sources = createRefsArray(fsLightbox);

        fillIndexedCollection(fsLightbox, 'sourceLoadHandlers', SourceLoadHandler);
        fillIndexedCollection(fsLightbox, 'sourceMainWrapperTransformers', SourceMainWrapperTransformer);

        setUpCore(fsLightbox);

        eventsDispatcher.dispatch('onInit');

        isLightboxOpenManager.set(true, () => {
            lightboxOpenActioner.runInitializedLightboxActions();
            createSources(fsLightbox);
        });
    };
}
