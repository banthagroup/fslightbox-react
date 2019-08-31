export function setUpWindowResizeEventController(
    {
        core: {
            eventsControllers: {
                window: {
                    resize: self
                }
            },
            windowResizeActioner
        }
    }
) {
    self.attachListener = () => {
        addEventListener('resize', windowResizeActioner.runActions);
    };

    self.removeListener = () => {
        removeEventListener('resize', windowResizeActioner.runActions);
    };
}
