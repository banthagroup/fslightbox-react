export function setUpSwipingEventsControllersFacade(
    {
        injector: {
            eventsControllers: {
                getWindowMoveEventController,
                getWindowUpEventController
            }
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
        getWindowMoveEventController(),
        getWindowUpEventController(),
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