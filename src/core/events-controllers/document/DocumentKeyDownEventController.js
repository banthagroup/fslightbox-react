/**
 * @constructor
 */
export function DocumentKeyDownEventController({ core, }) {
    this.attachListener = () => {
        document.addEventListener('keydown', core.keyboardController.handleKeyDown)
    };

    this.removeListener = () => {
        document.removeEventListener('keydown', core.keyboardController.handleKeyDown)
    };
}