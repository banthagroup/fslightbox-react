import { setUpClassListManager } from "./elements/setUpClassListManager";
import { getSwipingProps } from "./slide-swiping/getSwipingProps";
import { setUpLightboxOpener } from "./main-component/opening/setUpLightboxOpener";
import { setUpSlideSwipingMove } from "./slide-swiping/events/setUpSlideSwipingMove";
import { setUpSourceLoadActions } from "./sources/setUpSourceLoadActions";
import { setUpFullscreenToggler } from "./fullscreen/setUpFullscreenToggler";
import { setUpWindowResizeActions } from "./sizes/setUpWindowResizeActions";
import { setUpDocumentKeyDownEventController } from "./events/document/setUpDocumentKeyDownEventController";
import { setUpWindowResizeEventController } from "./events/window/resize/setUpWindowResizeEventController";
import { setUpSwipingEventsControllersFacade } from "./events/facades/setUpSwipingEventsControllersFacade";
import { setUpKeyboardController } from "./keyboard/setUpKeyboardController";
import { setUpLightboxCloser } from "./main-component/closing/setUpLightboxCloser";
import { setUpLightboxOpeningActions } from "./main-component/opening/setUpLightboxOpeningActions";
import { setUpScrollbarRecompensor } from "./scrollbar/setUpScrollbarRecompensor";
import { setUpSlideSwipingDown } from "./slide-swiping/events/setUpSlideSwipingDown";
import { setUpSlideSwipingUp } from "./slide-swiping/events/setUpSlideSwipingUp";
import { setUpLightboxUpdater } from "./main-component/updating/setUpLightboxUpdater";
import { setUpStageManager } from "./stage/setUpStageManager";
import { setUpSlideIndexChanger } from "./slide/setUpSlideIndexChanger";
import { setUpEventsDispatcher } from "./events/setUpEventsDispatcher";
import { setUpSlideChangeFacade } from "./slide/setUpSlideChangeFacade";

export function setUpCore(fsLightbox) {
    setUpClassListManager(fsLightbox);
    // events controllers
    setUpDocumentKeyDownEventController(fsLightbox);
    setUpWindowResizeEventController(fsLightbox);
    setUpSwipingEventsControllersFacade(fsLightbox);
    // ------------------
    setUpEventsDispatcher(fsLightbox);
    setUpFullscreenToggler(fsLightbox);
    setUpKeyboardController(fsLightbox);
    setUpLightboxCloser(fsLightbox);
    setUpLightboxOpener(fsLightbox);
    setUpLightboxOpeningActions(fsLightbox);
    setUpLightboxUpdater(fsLightbox);
    setUpScrollbarRecompensor(fsLightbox);
    setUpSlideChangeFacade(fsLightbox);
    setUpSlideIndexChanger(fsLightbox);
    // slide swiping
    const swipingProps = getSwipingProps();
    setUpSlideSwipingDown(fsLightbox, swipingProps);
    setUpSlideSwipingMove(fsLightbox, swipingProps);
    setUpSlideSwipingUp(fsLightbox, swipingProps);
    // ------------------
    setUpSourceLoadActions(fsLightbox);
    setUpStageManager(fsLightbox);
    setUpWindowResizeActions(fsLightbox);
}

