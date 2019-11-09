import { initializeLightbox } from "../initializing/initializeLightbox";
import { OPEN_CLASS_NAME } from "../../../constants/classes-names";

export function setUpLightboxOpenActioner(fsLightbox) {
    const {
        collections: { sourcesOutersTransformers },
        core: {
            eventsDispatcher,
            lightboxOpenActioner: self,
            globalEventsController,
            scrollbarRecompensor,
            sourceDisplayFacade,
            stageManager,
            windowResizeActioner
        },
        data,
        stageIndexes
    } = fsLightbox;

    self.runActions = () => {
        stageManager.updateStageIndexes();
        document.documentElement.classList.add(OPEN_CLASS_NAME);
        windowResizeActioner.runActions();
        scrollbarRecompensor.addRecompense();
        globalEventsController.attachListeners();
        sourcesOutersTransformers[stageIndexes.current].zero();
        eventsDispatcher.dispatch('onOpen');

        if (data.isInitialized) {
            eventsDispatcher.dispatch('onShow');
            sourceDisplayFacade.displayStageSourcesIfNotYet();
        } else {
            initializeLightbox(fsLightbox);
        }
    };
}
