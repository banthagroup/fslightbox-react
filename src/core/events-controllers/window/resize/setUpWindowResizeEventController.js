export function setUpWindowResizeEventController(
    {
        core: {
            eventsControllers: {
                window: {
                    resize: self
                }
            },
            globalResizingController
        }
    }
) {
    self.attachListener = () => {
        window.addEventListener('resize', globalResizingController.runAllResizingActions);
    };

    self.removeListener = () => {
        window.removeEventListener('resize', globalResizingController.runAllResizingActions);
    };
}