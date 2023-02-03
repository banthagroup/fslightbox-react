import { createSources } from "../../sources/creating/createSources";
import { s } from "../../s";
import { createRefsArray } from "../../../h/arrays/createRefsArray";
import { fillIndexedCollection } from "../../collections/fillIndexedCollection";
import { SourceLoadHandler } from "../../sources/SourceLoadHandler";

export function so(o) {
    var {
        componentsServices: { isLightboxOpenManager },
        core: { eventsDispatcher, lightboxOpener: self, lightboxOpenActioner },
        elements
    } = o;

    o.o = () => {
        eventsDispatcher.dispatch('onShow');
        fillIndexedCollection(fsLightbox, 'sourceLoadHandlers', SourceLoadHandler);
        isLightboxOpenManager.set(true, lightboxOpenActioner.runInitializedLightboxActions);
    };

    o.i = () => {
	o.ii = true;
	
        o.smw = createRefsArray(fsLightbox);
        o.saw = createRefsArray(fsLightbox);
        elements.sources = createRefsArray(fsLightbox);

        fillIndexedCollection(fsLightbox, 'sourceLoadHandlers', SourceLoadHandler);

        s(fsLightbox);

        eventsDispatcher.dispatch('onInit');

        isLightboxOpenManager.set(true, () => {
        st.updateStageIndexes();

        sourceDisplayFacade.displaySourcesWhichShouldBeDisplayed();

        document.documentElement.classList.add(OPEN_CLASS_NAME);

        scrollbarRecompensor.addRecompense();

        globalEventsController.attachListeners();

        windowResizeActioner.runActions();
        sourceMainWrapperTransformers[stageIndexes.current].zero();

        eventsDispatcher.dispatch('onOpen');

            createSources(fsLightbox);
        });
    };
}
