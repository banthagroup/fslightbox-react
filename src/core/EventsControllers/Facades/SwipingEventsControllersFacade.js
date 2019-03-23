import { WindowMoveEventController } from "../Window/Move/WindowMoveEventController";
import { WindowUpEventController } from "../Window/Up/WindowUpEventController";
import { WindowDownEventController } from "../Window/Down/WindowDownEventController";

/**
 * @class SwipingEventsControllersFacade
 */
export function SwipingEventsControllersFacade(fsLightbox) {
    const swipingControllers = [
        new WindowMoveEventController(fsLightbox),
        new WindowUpEventController(fsLightbox),
        new WindowDownEventController(fsLightbox),
    ];
}