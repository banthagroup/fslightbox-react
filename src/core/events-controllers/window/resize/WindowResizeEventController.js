/**
 * @class
 * @param { FsLightbox.core.globalResizingController.runAllResizingActions | Function } runAllResizingActions
 */
export function WindowResizeEventController(
    {
        core: {
            globalResizingController: { runAllResizingActions },
        }
    }
) {
    this.attachListener = () => {
        window.addEventListener('resize', runAllResizingActions);
    };

    this.removeListener = () => {
        window.removeEventListener('resize', runAllResizingActions);
    };
}