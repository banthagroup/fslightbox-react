export function setUpWindowResizeEventController(
    {
        core: {
            eventsControllers: {
                window: {
                    resize: self
                }
            },
            windowResizeActions
        }
    }
) {
    self.attachListener = () => {
        window.addEventListener('resize', windowResizeActions.runActions);
    };

    self.removeListener = () => {
        window.removeEventListener('resize', windowResizeActions.runActions);
    };
}
