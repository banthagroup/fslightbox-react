import { getSwipingProps } from "./slide-swiping/getSwipingProp";

/**
 * @param { FsLightbox } fsLightbox
 */
export function setUpCore(fsLightbox) {
    const {
        core,
        injector: {
            core: {
                eventsControllers: {
                    document: { getKeyDown },
                    window: { getResize, getSwiping }
                },
                getFullscreenToggler,
                getGlobalResizingController,
                getKeyboardController,
                getLightboxCloser,
                getLightboxInitializer,
                getLightboxOpener,
                getLightboxOpeningActions,
                getScrollbarRecompensor,
                getSlideChanger,
                slideSwiping: {
                    getDownForSwipingProps,
                    getMoveForSwipingProps,
                    getUpForSwipingProps
                },
                getSourceAnimator,
                getSourceController,
                getSourceHoldersTransformer,
                getSourcesFactory,
                getStage
            }
        }
    } = fsLightbox;
    const {
        eventsControllers: {
            document: documentEventsControllers,
            window: windowEventsControllers
        },
        slideSwiping,
    } = core;

    // eventsControllers
    Object.assign(documentEventsControllers.keyDown, getKeyDown());
    Object.assign(windowEventsControllers.resize, getResize());
    Object.assign(windowEventsControllers.swiping, getSwiping());

    // fullscreenToggler
    Object.assign(core.fullscreenToggler, getFullscreenToggler());

    // globalResizingController
    Object.assign(core.globalResizingController, getGlobalResizingController());

    // keyboardController
    Object.assign(core.keyboardController, getKeyboardController());

    // lightboxCloser
    Object.assign(core.lightboxCloser, getLightboxCloser());

    // lightboxInitializer
    Object.assign(core.lightboxInitializer, getLightboxInitializer());

    // lightboxOpener
    Object.assign(core.lightboxOpener, getLightboxOpener());

    // lightboxOpeningActions
    Object.assign(core.lightboxOpeningActions, getLightboxOpeningActions());

    // scrollbarRecompensor
    Object.assign(core.scrollbarRecompensor, getScrollbarRecompensor());

    // slideChanger
    Object.assign(core.slideChanger, getSlideChanger());

    // slideSwiping
    const swipingProps = getSwipingProps();
    Object.assign(slideSwiping.down, getDownForSwipingProps(swipingProps));
    Object.assign(slideSwiping.move, getMoveForSwipingProps(swipingProps));
    Object.assign(slideSwiping.up, getUpForSwipingProps(swipingProps));

    // sourceAnimator
    Object.assign(core.sourceAnimator, getSourceAnimator());

    // sourceController
    Object.assign(core.sourceController, getSourceController());

    // sourceHoldersTransformer
    Object.assign(core.sourceHoldersTransformer, getSourceHoldersTransformer());

    // sourcesFactory
    Object.assign(core.sourcesFactory, getSourcesFactory());

    // stage
    Object.assign(core.stage, getStage());
}

