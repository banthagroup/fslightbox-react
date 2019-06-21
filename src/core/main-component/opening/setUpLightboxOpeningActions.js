import { ON_OPEN, ON_SHOW } from "../../../constants/eventsConstants";
import { initializeLightbox } from "../initializing/initializeLightbox";
import { getDocumentElementClassList } from "../../../helpers/dom/document/getDocumentElementClassList";
import { OPEN_CLASS_NAME } from "../../../constants/classes-names";

export function setUpLightboxOpeningActions(fsLightbox) {
    const {
        stageIndexes,
        data,
        eventsDispatcher: {
            dispatch
        },
        collections: {
            sourcesHoldersTransformers
        },
        core: {
            lightboxOpeningActions: self,
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
            slideIndexChanger,
            globalResizingController,
        }
    } = fsLightbox;

    self.runActions = () => {
        callActionsDependingOnIsInitialized();
        getDocumentElementClassList().add(OPEN_CLASS_NAME);
        scrollbarRecompensor.addRecompense();
        windowResizeEventController.attachListener();
        swipingEventsController.attachListeners();
        documentKeyDownEventController.attachListener();
        globalResizingController.runAllResizingActions();
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
        initializeLightbox(fsLightbox);
    };
}
