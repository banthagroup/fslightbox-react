import { WindowResizeEventController } from "./Window/Resize/WindowResizeEventController";
import { SwipingEventsControllersFacade } from "./Facades/SwipingEventsControllersFacade";

/**
 * @class EventsControllers
 * @param { Events } events
 */
export function EventsControllers(fsLightbox) {
    this.window = {
        resize: new WindowResizeEventController(fsLightbox),
        swiping: new SwipingEventsControllersFacade(fsLightbox)
    };
}