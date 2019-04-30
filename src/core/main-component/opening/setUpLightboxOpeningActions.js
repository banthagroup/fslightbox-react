import { addOpenClassToDocumentElement } from "../../../helpers/dom/document/addOpenClassToDocumentElement";

export function setUpLightboxOpeningActions(
    {
        data,
        core: {
            lightboxOpeningActions: self,
            lightboxInitializer,
            scrollbarRecompensor,
            eventsControllers: {
                window: {
                    resize: windowResizeEventController,
                    swiping: swipingEventsController
                },
                document: {
                    keyDown: documentKeyDownEventController
                }
            },
            globalResizingController,
            sourceHoldersTransformer,
        },
    }
) {
    self.runActions = () => {
        ifNotYetInitializedInitialize();
        addOpenClassToDocumentElement();
        scrollbarRecompensor.addRecompense();
        windowResizeEventController.attachListener();
        swipingEventsController.attachListeners();
        documentKeyDownEventController.attachListener();
        globalResizingController.runAllResizingActions();
        sourceHoldersTransformer.transformStageSourceHolders().withoutTimeout();
    };

    const ifNotYetInitializedInitialize = () => {
        if (!data.isInitialized)
            lightboxInitializer.initialize();
    };
}