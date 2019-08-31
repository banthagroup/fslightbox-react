import { setUpLightboxOpener } from "./main-component/opening/setUpLightboxOpener";
import { setUpSlideSwipingMove } from "./slide/swiping/move/setUpSlideSwipingMove";
import { setUpFullscreenToggler } from "./fullscreen/setUpFullscreenToggler";
import { setUpWindowResizeActioner } from "./sizes/setUpWindowResizeActioner";
import { setUpDocumentKeyDownEventController } from "./events/document/setUpDocumentKeyDownEventController";
import { setUpWindowResizeEventController } from "./events/window/resize/setUpWindowResizeEventController";
import { setUpSwipingEventsControllersFacade } from "./events/facades/setUpSwipingEventsControllersFacade";
import { setUpKeyboardController } from "./keyboard/setUpKeyboardController";
import { setUpLightboxCloser } from "./main-component/closing/setUpLightboxCloser";
import { setUpLightboxOpenActioner } from "./main-component/opening/setUpLightboxOpenActioner";
import { setUpScrollbarRecompensor } from "./scrollbar/setUpScrollbarRecompensor";
import { setUpSlideSwipingDown } from "./slide/swiping/down/setUpSlideSwipingDown";
import { setUpSlideSwipingUp } from "./slide/swiping/up/setUpSlideSwipingUp";
import { setUpLightboxUpdater } from "./main-component/updating/setUpLightboxUpdater";
import { setUpStageManager } from "./stage/setUpStageManager";
import { setUpSlideIndexChanger } from "./slide/setUpSlideIndexChanger";
import { setUpEventsDispatcher } from "./events/setUpEventsDispatcher";
import { setUpSlideChangeFacade } from "./slide/setUpSlideChangeFacade";
import { setUpClassFacade } from "./elements/setUpClassFacade";

export function setUpCore(fsLightbox) {
    setUpClassFacade(fsLightbox);
    setUpDocumentKeyDownEventController(fsLightbox);
    setUpWindowResizeEventController(fsLightbox);
    setUpSwipingEventsControllersFacade(fsLightbox);
    setUpEventsDispatcher(fsLightbox);
    setUpFullscreenToggler(fsLightbox);
    setUpKeyboardController(fsLightbox);
    setUpLightboxCloser(fsLightbox);
    setUpLightboxOpener(fsLightbox);
    setUpLightboxOpenActioner(fsLightbox);
    setUpLightboxUpdater(fsLightbox);
    setUpScrollbarRecompensor(fsLightbox);
    setUpSlideChangeFacade(fsLightbox);
    setUpSlideIndexChanger(fsLightbox);
    setUpSlideSwipingDown(fsLightbox);
    setUpSlideSwipingMove(fsLightbox);
    setUpSlideSwipingUp(fsLightbox);
    setUpStageManager(fsLightbox);
    setUpWindowResizeActioner(fsLightbox);
}

