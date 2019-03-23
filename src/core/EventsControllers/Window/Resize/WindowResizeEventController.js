/**
 * @class WindowResizeEventController
 * @param { FsLightbox.core.sizeController | SizeController } sizeController
 * @param { FsLightbox.core.sourceSizeAdjusterIterator | SourceSizeAdjusterIterator } sourceSizeAdjusterIterator
 * @param { FsLightbox.core.sourceHoldersTransformer | SourceHoldersTransformer } sourceHoldersTransformer
 */
export function WindowResizeEventController(
    {
        core: { sizeController, sourceSizeAdjusterIterator, sourceHoldersTransformer }
    }
) {
    this.attachListener = () => {
        window.addEventListener('resize', listener);
    };

    this.removeListener = () => {
        window.removeEventListener('resize', listener);
    };

    const listener = () => {
        sizeController.controlAll();
        sourceSizeAdjusterIterator.adjustAllSourcesSizes();
        sourceHoldersTransformer.transformStageSourceHolders().withoutTimeout();
    };
}