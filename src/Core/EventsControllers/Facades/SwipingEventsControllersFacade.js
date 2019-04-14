import { WindowMoveEventController } from "../Window/Move/WindowMoveEventController";
import { WindowUpEventController } from "../Window/Up/WindowUpEventController";

/**
 * @class
 * @param { FsLightbox } fsLightbox
 */
export function SwipingEventsControllersFacade(fsLightbox) {
    const swipingControllers = [
        new WindowMoveEventController(fsLightbox),
        new WindowUpEventController(fsLightbox),
    ];

    this.attachListeners = () => {
        for(let i = 0; i < swipingControllers.length; i++) {
            swipingControllers[i].attachListener();
        }
    };

    this.removeListeners = () => {
        for(let i = 0; i < swipingControllers.length; i++) {
            swipingControllers[i].removeListener();
        }
    }
}