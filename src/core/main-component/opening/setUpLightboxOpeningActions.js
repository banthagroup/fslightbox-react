import { ON_OPEN, ON_SHOW } from "../../../constants/events-constants";
import { initializeLightbox } from "../initializing/initializeLightbox";
import { OPEN_CLASS_NAME } from "../../../constants/classes-names";

export function setUpLightboxOpeningActions(fsLightbox) {
    const {
        data,
        core: {
            eventsControllers: {
                window: {
                    resize: windowResizeEventController,
                    swiping: swipingEventsController
                },
                document: {
                    keyDown: documentKeyDownEventController
                }
            },
            eventsDispatcher,
            lightboxOpenActions: self,
            scrollbarRecompensor,
            stageManager,
            windowResizeActions,
        }
    } = fsLightbox;

    self.runActions = () => {
        stageManager.updateStageIndexes();

        document.documentElement.classList.add(OPEN_CLASS_NAME);

        windowResizeActions.runActions();

        scrollbarRecompensor.addRecompense();

        windowResizeEventController.attachListener();
        swipingEventsController.attachListeners();
        documentKeyDownEventController.attachListener();

        eventsDispatcher.dispatch(ON_OPEN);

        (data.isInitialized) ?
            eventsDispatcher.dispatch(ON_SHOW) :
            initializeLightbox(fsLightbox);
    };
}
