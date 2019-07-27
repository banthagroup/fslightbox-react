import { WindowMoveEventController } from "../window/move/WindowMoveEventController";
import { WindowUpEventController } from "../window/up/WindowUpEventController";

export function setUpSwipingEventsControllersFacade(
    {
        injector: {
            resolve
        },
        core: {
            eventsControllers: {
                window: {
                    swiping: self
                }
            }
        }
    }
) {
    const swipingControllers = [
        resolve(WindowMoveEventController),
        resolve(WindowUpEventController)
    ];

    self.attachListeners = () => {
        for (let i = 0; i < swipingControllers.length; i++) {
            swipingControllers[i].attachListener();
        }
    };

    self.removeListeners = () => {
        for (let i = 0; i < swipingControllers.length; i++) {
            swipingControllers[i].removeListener();
        }
    }
}
