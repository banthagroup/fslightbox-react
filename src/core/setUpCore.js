import { setUpClassListsManager } from "./elements/setUpClassListsManager";
import { getSwipingProps } from "./slide-swiping/getSwipingProps";
import { setUpLightboxOpener } from "./main-component/opening/setUpLightboxOpener";
import { setUpSlideSwipingMove } from "./slide-swiping/events/setUpSlideSwipingMove";
import { setUpSourceController } from "./sources/setUpSourceController";
import { setUpSourcesHoldersTransformingFacade } from "./transforms/setUpSourcesHoldersTransformingFacade";
import { setUpFullscreenToggler } from "./fullscreen/setUpFullscreenToggler";
import { setUpGlobalResizingController } from "./sizes/setUpGlobalResizingController";
import { setUpDocumentKeyDownEventController } from "./events-controllers/document/setUpDocumentKeyDownEventController";
import { setUpWindowResizeEventController } from "./events-controllers/window/resize/setUpWindowResizeEventController";
import { setUpSwipingEventsControllersFacade } from "./events-controllers/facades/setUpSwipingEventsControllersFacade";
import { setUpKeyboardController } from "./keyboard/setUpKeyboardController";
import { setUpLightboxCloser } from "./main-component/closing/setUpLightboxCloser";
import { setUpLightboxOpeningActions } from "./main-component/opening/setUpLightboxOpeningActions";
import { setUpScrollbarRecompensor } from "./scrollbar/setUpScrollbarRecompensor";
import { setUpSlideSwipingDown } from "./slide-swiping/events/setUpSlideSwipingDown";
import { setUpSlideSwipingUp } from "./slide-swiping/events/setUpSlideSwipingUp";
import { setUpSourceAnimator } from "./animations/setUpSourceAnimator";
import { setUpLightboxUpdater } from "./main-component/updating/setUpLightboxUpdater";
import { setUpStageManager } from "./stage/setUpStageManager";
import { setUpSlideNumberUpdater } from "./slide/setUpSlideNumberUpdater";
import { setUpSlideIndexChanger } from "./slide/setUpSlideIndexChanger";

export function setUpCore(fsLightbox) {
    setUpClassListsManager(fsLightbox);

    setUpDocumentKeyDownEventController(fsLightbox);
    setUpWindowResizeEventController(fsLightbox);
    setUpSwipingEventsControllersFacade(fsLightbox);

    setUpFullscreenToggler(fsLightbox);

    setUpGlobalResizingController(fsLightbox);

    setUpKeyboardController(fsLightbox);

    setUpLightboxCloser(fsLightbox);

    setUpLightboxOpener(fsLightbox);

    setUpLightboxOpeningActions(fsLightbox);

    setUpLightboxUpdater(fsLightbox);

    setUpScrollbarRecompensor(fsLightbox);

    setUpSlideIndexChanger(fsLightbox);

    setUpSlideNumberUpdater(fsLightbox);

    const swipingProps = getSwipingProps();
    setUpSlideSwipingDown(fsLightbox, swipingProps);
    setUpSlideSwipingMove(fsLightbox, swipingProps);
    setUpSlideSwipingUp(fsLightbox, swipingProps);

    setUpSourceAnimator(fsLightbox);

    setUpSourceController(fsLightbox);

    setUpSourcesHoldersTransformingFacade(fsLightbox);

    setUpStageManager(fsLightbox);

}

