/**
 * @class
 * @param { FsLightbox.core.globalResizingController.controlAllSizes | Function } controlAll
 * @param { FsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders
 * | function(): StageSourceHoldersTransformer } transformStageSourceHolders
 */
export function WindowResizeEventController(
    {
        core: {
            globalResizingController: { runAllResizingActions },
            sourceHoldersTransformer: { transformStageSourceHolders }
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