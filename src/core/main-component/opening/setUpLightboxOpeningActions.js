import { addOpenClassToDocumentElement } from "../../../helpers/dom/document/addOpenClassToDocumentElement";
import { ON_OPEN, ON_SHOW } from "../../../constants/eventsConstants";

export function setUpLightboxOpeningActions(
    {
        data,
        eventsDispatcher: {
            dispatch
        },
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
        }
    }
) {
    self.runActions = () => {
        callActionsDependingOnIsInitialized();
        addOpenClassToDocumentElement();
        scrollbarRecompensor.addRecompense();
        windowResizeEventController.attachListener();
        swipingEventsController.attachListeners();
        documentKeyDownEventController.attachListener();
        globalResizingController.runAllResizingActions();
        sourceHoldersTransformer.transformStageSourceHolders().withoutTimeout();
        dispatch(ON_OPEN);
    };

    const callActionsDependingOnIsInitialized = () => {
        (data.isInitialized) ?
            callInitializedActions() :
            callNotInitializedActions();
    };

    const callInitializedActions = () => {
        dispatch(ON_SHOW);
    };

    const callNotInitializedActions = () => {
        lightboxInitializer.initialize();
    };
}