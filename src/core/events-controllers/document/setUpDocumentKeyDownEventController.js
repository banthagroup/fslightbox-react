export function setUpDocumentKeyDownEventController(
    {
        core: {
            eventsControllers: {
                document: {
                    keyDown: self
                }
            },
            keyboardController
        }
    }
) {
    self.attachListener = () => {
        document.addEventListener('keydown', keyboardController.handleKeyDown);
    };

    self.removeListener = () => {
        document.removeEventListener('keydown', keyboardController.handleKeyDown)
    };
}
