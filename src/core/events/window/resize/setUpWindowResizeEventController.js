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
        addEventListener('resize', windowResizeActions.runActions);
    };

    self.removeListener = () => {
        removeEventListener('resize', windowResizeActions.runActions);
    };
}
