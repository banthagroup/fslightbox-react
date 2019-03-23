import { WindowMoveEventController } from "../Window/Move/WindowMoveEventController";
import { WindowUpEventController } from "../Window/Up/WindowUpEventController";

/**
 * @class SwipingEventsControllersFacade
 */
export function SwipingEventsControllersFacade(fsLightbox) {
    const swipingControllers = [
        new WindowMoveEventController(fsLightbox),
        new WindowUpEventController(fsLightbox),
    ];
}