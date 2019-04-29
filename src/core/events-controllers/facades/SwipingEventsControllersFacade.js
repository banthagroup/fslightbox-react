/**
 * @constructor
 * @param { FsLightbox.injector.eventsControllers.getWindowMoveEventController | function(): WindowMoveEventController} getWindowMoveEventController
 * @param { FsLightbox.injector.eventsControllers.getWindowUpEventController | function(): WindowUpEventController} getWindowUpEventController
 */
export function SwipingEventsControllersFacade(
    {
        injector: {
            eventsControllers: {
                getWindowMoveEventController,
                getWindowUpEventController
            }
        }
    }
) {
    const swipingControllers = [
        getWindowMoveEventController(),
        getWindowUpEventController(),
    ];

    this.attachListeners = () => {
        for (let i = 0; i < swipingControllers.length; i++) {
            swipingControllers[i].attachListener();
        }
    };

    this.removeListeners = () => {
        for (let i = 0; i < swipingControllers.length; i++) {
            swipingControllers[i].removeListener();
        }
    }
}