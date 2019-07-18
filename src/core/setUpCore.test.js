import * as setUpClassListsManagerObject from "./elements/setUpClassListManager";
import * as getSwipingPropsObject from "./slide-swiping/getSwipingProps";
import * as setUpLightboxOpenerObject from "./main-component/opening/setUpLightboxOpener";
import * as setUpEventsDispatcherObject from "./events/setUpEventsDispatcher";
import * as setUpSlideSwipingMoveObject from "./slide-swiping/events/setUpSlideSwipingMove";
import * as setUpSourceLoadActions from "./sources/setUpSourceLoadActions";
import * as setUpSourcesFactoryObject from "./sources/creating/createSources";
import * as setUpFullscreenTogglerObject from "./fullscreen/setUpFullscreenToggler";
import * as setUpWindowResizeActionsObject from "./sizes/setUpWindowResizeActions";
import * as setUpDocumentKeyDownEventControllerObject
    from "./events/document/setUpDocumentKeyDownEventController";
import * as setUpWindowResizeEventControllerObject
    from "./events/window/resize/setUpWindowResizeEventController";
import * as setUpSwipingEventsControllersFacadeObject
    from "./events/facades/setUpSwipingEventsControllersFacade";
import * as setUpKeyboardControllerObject from "./keyboard/setUpKeyboardController";
import * as setUpLightboxCloserObject from "./main-component/closing/setUpLightboxCloser";
import * as setUpLightboxOpeningActionsObject from "./main-component/opening/setUpLightboxOpeningActions";
import * as setUpLightboxUpdaterObject from "./main-component/updating/setUpLightboxUpdater";
import * as setUpScrollbarRecompensorObject from "./scrollbar/setUpScrollbarRecompensor";
import * as setUpSlideChangeFacadeObject from './slide/setUpSlideChangeFacade';
import * as setUpSlideIndexChangerObject from "./slide/setUpSlideIndexChanger";
import * as setUpSlideSwipingDownObject from "./slide-swiping/events/setUpSlideSwipingDown";
import * as setUpSlideSwipingUpObject from "./slide-swiping/events/setUpSlideSwipingUp";
import * as setUpStageManagerObject from "./stage/setUpStageManager";
import { setUpCore } from "./setUpCore";

const fsLightbox = { key: 'fsLightbox' };
const swipingProps = { key: 'swipingProps' };

beforeAll(() => {
    setUpClassListsManagerObject.setUpClassListManager = jest.fn();
    setUpEventsDispatcherObject.setUpEventsDispatcher = jest.fn();
    setUpLightboxOpenerObject.setUpLightboxOpener = jest.fn();
    setUpSourceLoadActions.setUpSourceLoadActions = jest.fn();
    setUpSourcesFactoryObject.createSources = jest.fn();
    setUpFullscreenTogglerObject.setUpFullscreenToggler = jest.fn();
    setUpDocumentKeyDownEventControllerObject.setUpDocumentKeyDownEventController = jest.fn();
    setUpWindowResizeEventControllerObject.setUpWindowResizeEventController = jest.fn();
    setUpSwipingEventsControllersFacadeObject.setUpSwipingEventsControllersFacade = jest.fn();
    setUpKeyboardControllerObject.setUpKeyboardController = jest.fn();
    setUpLightboxCloserObject.setUpLightboxCloser = jest.fn();
    setUpLightboxOpeningActionsObject.setUpLightboxOpeningActions = jest.fn();
    setUpLightboxUpdaterObject.setUpLightboxUpdater = jest.fn();
    setUpScrollbarRecompensorObject.setUpScrollbarRecompensor = jest.fn();
    setUpSlideChangeFacadeObject.setUpSlideChangeFacade = jest.fn();
    setUpSlideIndexChangerObject.setUpSlideIndexChanger = jest.fn();
    getSwipingPropsObject.getSwipingProps = () => swipingProps;
    setUpSlideSwipingMoveObject.setUpSlideSwipingMove = jest.fn();
    setUpSlideSwipingDownObject.setUpSlideSwipingDown = jest.fn();
    setUpSlideSwipingUpObject.setUpSlideSwipingUp = jest.fn();
    setUpStageManagerObject.setUpStageManager = jest.fn();
    setUpWindowResizeActionsObject.setUpWindowResizeActions = jest.fn();
    setUpCore(fsLightbox);
});

it('should setUpCore', () => {
    expect(setUpClassListsManagerObject.setUpClassListManager).toBeCalledWith(fsLightbox);
    // events controllers
    expect(setUpDocumentKeyDownEventControllerObject.setUpDocumentKeyDownEventController).toBeCalledWith(fsLightbox);
    expect(setUpWindowResizeEventControllerObject.setUpWindowResizeEventController).toBeCalledWith(fsLightbox);
    expect(setUpSwipingEventsControllersFacadeObject.setUpSwipingEventsControllersFacade).toBeCalledWith(fsLightbox);
    // ------------------
    expect(setUpEventsDispatcherObject.setUpEventsDispatcher).toBeCalled();
    expect(setUpFullscreenTogglerObject.setUpFullscreenToggler).toBeCalledWith(fsLightbox);
    expect(setUpKeyboardControllerObject.setUpKeyboardController).toBeCalledWith(fsLightbox);
    expect(setUpLightboxCloserObject.setUpLightboxCloser).toBeCalledWith(fsLightbox);
    expect(setUpLightboxOpenerObject.setUpLightboxOpener).toBeCalledWith(fsLightbox);
    expect(setUpLightboxOpeningActionsObject.setUpLightboxOpeningActions).toBeCalledWith(fsLightbox);
    expect(setUpLightboxUpdaterObject.setUpLightboxUpdater).toBeCalledWith(fsLightbox);
    expect(setUpScrollbarRecompensorObject.setUpScrollbarRecompensor).toBeCalledWith(fsLightbox);
    expect(setUpSlideChangeFacadeObject.setUpSlideChangeFacade).toBeCalledWith(fsLightbox);
    expect(setUpSlideIndexChangerObject.setUpSlideIndexChanger).toBeCalledWith(fsLightbox);
    // slide swiping
    expect(setUpSlideSwipingDownObject.setUpSlideSwipingDown).toBeCalledWith(fsLightbox, swipingProps);
    expect(setUpSlideSwipingMoveObject.setUpSlideSwipingMove).toBeCalledWith(fsLightbox, swipingProps);
    expect(setUpSlideSwipingUpObject.setUpSlideSwipingUp).toBeCalledWith(fsLightbox, swipingProps);
    // ------------------
    expect(setUpSourceLoadActions.setUpSourceLoadActions).toBeCalledWith(fsLightbox);
    expect(setUpStageManagerObject.setUpStageManager).toBeCalledWith(fsLightbox);
    expect(setUpWindowResizeActionsObject.setUpWindowResizeActions).toBeCalledWith(fsLightbox);
});
