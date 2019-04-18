/**
 * @class
 * @param { FsLightbox.core.globalResizingController.saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize | Function } saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize
 * @param { FsLightbox.core.eventsControllers.window.resize.attachListener | Function } attachWindowResizeListener
 * @param { FsLightbox.core.eventsControllers.window.swiping.attachListeners | Function } attachSwipingListeners
 * @param { FsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders | Function } transformStageSourceHolders
 * @param { FsLightbox.core.lightboxOpener.addOpenClassToDocumentElement | Function } addOpenClassToDocumentElement
 */
export function LightboxInitializer(
    {
        core: {
            globalResizingController: {
                saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize
            },
            eventsControllers: {
                window: {
                    resize: {
                        attachListener: attachWindowResizeListener
                    },
                    swiping: {
                        attachListeners: attachSwipingListeners
                    }
                },
            },
            sourceHoldersTransformer: { transformStageSourceHolders },
            lightboxOpener: { addOpenClassToDocumentElement }
        }
    }
) {
    this.initialize = () => {
        saveMaxSourcesDimensionsAndAdjustSourcesWrapperSize();
        attachWindowResizeListener();
        attachSwipingListeners();
        transformStageSourceHolders().withoutTimeout();
        addOpenClassToDocumentElement();
    }
}