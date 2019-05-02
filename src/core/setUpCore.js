import { getSwipingProps } from "./slide-swiping/getSwipingProps";
import { setUpLightboxOpener } from "./main-component/opening/setUpLightboxOpener";
import { setUpSlideChanger } from "./slide/slide-changing/setUpSlideChanger";
import { setUpSlideSwipingMove } from "./slide-swiping/events/setUpSlideSwipingMove";
import { setUpSourceController } from "./sources/setUpSourceController";
import { setUpSourceHoldersTransformer } from "./transforms/setUpSourceHoldersTransformer";
import { setUpSourcesFactory } from "./sources/creating/setUpSourcesFactory";
import { setUpFullscreenToggler } from "./fullscreen/setUpFullscreenToggler";
import { setUpGlobalResizingController } from "./sizes/setUpGlobalResizingController";
import { setUpDocumentKeyDownEventController } from "./events-controllers/document/setUpDocumentKeyDownEventController";
import { setUpWindowResizeEventController } from "./events-controllers/window/resize/setUpWindowResizeEventController";
import { setUpSwipingEventsControllersFacade } from "./events-controllers/facades/setUpSwipingEventsControllersFacade";
import { setUpKeyboardController } from "./keyboard/setUpKeyboardController";
import { setUpLightboxCloser } from "./main-component/closing/setUpLightboxCloser";
import { setUpLightboxInitializer } from "./main-component/setUpLightboxInitializer";
import { setUpLightboxOpeningActions } from "./main-component/opening/setUpLightboxOpeningActions";
import { setUpScrollbarRecompensor } from "./scrollbar/setUpScrollbarRecompensor";
import { setUpSlideSwipingDown } from "./slide-swiping/events/setUpSlideSwipingDown";
import { setUpSlideSwipingUp } from "./slide-swiping/events/setUpSlideSwipingUp";
import { setUpSourceAnimator } from "./animations/setUpSourceAnimator";
import { setUpStage } from "./stage/setUpStage";

export function setUpCore(fsLightbox) {
    // eventsControllers
    setUpDocumentKeyDownEventController(fsLightbox);
    setUpWindowResizeEventController(fsLightbox);
    setUpSwipingEventsControllersFacade(fsLightbox);

    // fullscreenToggler
    setUpFullscreenToggler(fsLightbox);

    // globalResizingController
    setUpGlobalResizingController(fsLightbox);

    // keyboardController
    setUpKeyboardController(fsLightbox);

    // lightboxCloser
    setUpLightboxCloser(fsLightbox);

    // lightboxInitializer
    setUpLightboxInitializer(fsLightbox);

    // lightboxOpener
    setUpLightboxOpener(fsLightbox);

    // lightboxOpeningActions
    setUpLightboxOpeningActions(fsLightbox);

    // scrollbarRecompensor
    setUpScrollbarRecompensor(fsLightbox);

    // slideChanger
    setUpSlideChanger(fsLightbox);

    // slideSwiping
    const swipingProps = getSwipingProps();
    setUpSlideSwipingDown(fsLightbox, swipingProps);
    setUpSlideSwipingMove(fsLightbox, swipingProps);
    setUpSlideSwipingUp(fsLightbox, swipingProps);

    // sourceAnimator
    setUpSourceAnimator(fsLightbox);

    // sourceController
    setUpSourceController(fsLightbox);

    // sourceHoldersTransformer
    setUpSourceHoldersTransformer(fsLightbox);

    // sourcesFactory
    setUpSourcesFactory(fsLightbox);

    // stage
    setUpStage(fsLightbox);
}

