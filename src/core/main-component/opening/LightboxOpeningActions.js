import { addOpenClassToDocumentElement } from "../../../helpers/dom/document/addOpenClassToDocumentElement";

/**
 * @constructor
 * @param { FsLightbox.data | { isInitialized: boolean } } data
 * @param { FsLightbox.core.lightboxInitializer.initialize| Function } initializeLightbox
 * @param { FsLightbox.core.scrollbarRecompensor.addRecompense | Function } addScrollbarRecompense
 * @param { FsLightbox.core.eventsControllers.window.resize.attachListener | Function } attachResizeListener
 * @param { FsLightbox.core.eventsControllers.window.swiping.attachListeners | Function } attachSwipingListeners
 * @param { FsLightbox.core.globalResizingController.runAllResizingActions | Function } runAllResizingActions
 * @param { FsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders | Function } transformStageSourceHolders
 */
export function LightboxOpeningActions(
    {
        data,
        core: {
            lightboxInitializer: {
                initialize: initializeLightbox
            },
            scrollbarRecompensor: {
                addRecompense: addScrollbarRecompense
            },
            eventsControllers: {
                window: {
                    resize: {
                        attachListener: attachResizeListener
                    },
                    swiping: {
                        attachListeners: attachSwipingListeners,
                    }
                }
            },
            globalResizingController: { runAllResizingActions },
            sourceHoldersTransformer: {
                transformStageSourceHolders
            },
        },
    }
) {
    this.runActions = () => {
        if (!data.isInitialized)
            initializeLightbox();
        addScrollbarRecompense();
        addOpenClassToDocumentElement();
        attachResizeListener();
        attachSwipingListeners();
        runAllResizingActions();
        transformStageSourceHolders().withoutTimeout();
    };
}