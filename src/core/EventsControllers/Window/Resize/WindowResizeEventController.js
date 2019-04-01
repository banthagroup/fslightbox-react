/**
 * @class
 * @param { FsLightbox.core.sizeController.controlAllSizes | Function } controlAll
 * @param { FsLightbox.core.sourceSizeAdjusterIterator.adjustAllSourcesSizes | Function } adjustAllSourcesSizes
 * @param { FsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders
 * | function(): StageSourceHoldersTransformer } transformStageSourceHolders
 */
export function WindowResizeEventController(
    {
        core: {
            sizeController: { controlAllSizes },
            sourceSizeAdjusterIterator: { adjustAllSourcesSizes },
            sourceHoldersTransformer: { transformStageSourceHolders }
        }
    }
) {
    this.attachListener = () => {
        window.addEventListener('resize', listener);
    };

    this.removeListener = () => {
        window.removeEventListener('resize', listener);
    };

    const listener = () => {
        controlAllSizes();
        adjustAllSourcesSizes();
        transformStageSourceHolders().withoutTimeout();
    };
}