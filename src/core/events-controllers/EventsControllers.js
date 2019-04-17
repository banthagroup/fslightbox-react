import { WindowResizeEventController } from "./window/resize/WindowResizeEventController";
import { SwipingEventsControllersFacade } from "./facades/SwipingEventsControllersFacade";

/**
 * @class
 * @param { FsLightbox } fsLightbox
 */
export function EventsControllers(fsLightbox) {
    this.window = {
        resize: new WindowResizeEventController(fsLightbox),
        swiping: new SwipingEventsControllersFacade(fsLightbox)
    };
}