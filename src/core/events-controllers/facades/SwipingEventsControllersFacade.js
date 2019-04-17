import { WindowMoveEventController } from "../window/move/WindowMoveEventController";
import { WindowUpEventController } from "../window/up/WindowUpEventController";

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