import { addOpenClassToDocumentElement } from "../../../helpers/dom/document/addOpenClassToDocumentElement";

/**
 * @constructor
 * @param { FsLightbox.data | { isInitialized: boolean } } data
 * @param { FsLightbox.core.lightboxInitializer | LightboxInitializer } lightboxInitializer
 * @param { FsLightbox.core.scrollbarRecompensor | ScrollbarRecompensor } scrollbarRecompensor
 * @param { FsLightbox.core.eventsControllers.window.resize | WindowResizeEventController } windowResizeEventController
 * @param { FsLightbox.core.eventsControllers.window.swiping | SwipingEventsControllersFacade } swipingEventsController
 * @param { FsLightbox.core.globalResizingController | GlobalResizingController } globalResizingController
 * @param { FsLightbox.core.sourceHoldersTransformer | SourceHoldersTransformer } sourceHoldersTransformer
 */
export function LightboxOpeningActions(
    {
        data,
        core: {
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
    this.runActions = () => {
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