import { setUpLightboxOpener } from "./main-component/opening/setUpLightboxOpener";
import { fs } from "./fs";
import { setUpLightboxCloser } from "./main-component/closing/setUpLightboxCloser";
import { setUpLightboxOpenActioner } from "./main-component/opening/setUpLightboxOpenActioner";
import { setUpScrollbarRecompensor } from "./scrollbar/setUpScrollbarRecompensor";
import { setUpLightboxUpdater } from "./main-component/updating/setUpLightboxUpdater";
import { setUpSlideIndexChanger } from "./slide/setUpSlideIndexChanger";
import { setUpEventsDispatcher } from "./events/setUpEventsDispatcher";
import { setUpSlideChangeFacade } from "./slide/setUpSlideChangeFacade";
import { setUpClassFacade } from "./elements/setUpClassFacade";
import { setUpGlobalEventsController } from "./events/setUpGlobalEventsController";
import { setUpLightboxCloseActioner } from "./main-component/closing/setUpLightboxCloseActioner";
import { setUpSlideSwipingDown } from "./slide/swiping/down/setUpSlideSwipingDown";
import { setUpSourceDisplayFacade } from "./sources/setUpSourceDisplayFacade";
import { sws } from "./sws";
import { setUpWindowResizeActioner } from "./sizes/setUpWindowResizeActioner";

export function setUpCore(fsLightbox) {
    setUpClassFacade(fsLightbox);
    setUpEventsDispatcher(fsLightbox);
    fs(fsLightbox);
    setUpGlobalEventsController(fsLightbox);
    setUpLightboxCloser(fsLightbox);
    setUpLightboxCloseActioner(fsLightbox);
    setUpLightboxOpener(fsLightbox);
    setUpLightboxOpenActioner(fsLightbox);
    setUpLightboxUpdater(fsLightbox);
    setUpScrollbarRecompensor(fsLightbox);
    setUpSlideChangeFacade(fsLightbox);
    setUpSlideIndexChanger(fsLightbox);
    setUpSlideSwipingDown(fsLightbox);
    setUpSourceDisplayFacade(fsLightbox);
sws(fsLightbox);
    setUpWindowResizeActioner(fsLightbox);
}
