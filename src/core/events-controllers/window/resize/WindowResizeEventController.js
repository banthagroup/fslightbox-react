/**
 * @class
 * @param { FsLightbox.core.globalResizingController | GlobalResizingController } globalResizingController
 */
export function WindowResizeEventController({ core: { globalResizingController } }) {
    this.attachListener = () => {
        window.addEventListener('resize', globalResizingController.runAllResizingActions);
    };

    this.removeListener = () => {
        window.removeEventListener('resize', globalResizingController.runAllResizingActions);
    };
}