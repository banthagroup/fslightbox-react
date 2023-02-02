import { OPEN_CLASS_NAME } from "../../../cn/classes-names";

export function setUpLightboxOpenActioner(fsLightbox) {
    const {
        collections: { sourceMainWrapperTransformers },
        core: {
            eventsDispatcher,
            lightboxOpenActioner: self,
            globalEventsController,
            scrollbarRecompensor,
            sourceDisplayFacade,
            stageManager,
            windowResizeActioner
        },
        stageIndexes
    } = fsLightbox;

    self.runInitializedLightboxActions = () => {
        stageManager.updateStageIndexes();

        sourceDisplayFacade.displaySourcesWhichShouldBeDisplayed();

        document.documentElement.classList.add(OPEN_CLASS_NAME);

        scrollbarRecompensor.addRecompense();

        globalEventsController.attachListeners();

        windowResizeActioner.runActions();
        sourceMainWrapperTransformers[stageIndexes.current].zero();

        eventsDispatcher.dispatch('onOpen');
    };
}
