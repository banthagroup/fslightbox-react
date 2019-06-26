import * as setUpClassListsManagerObject from "../../src/core/elements/setUpClassListsManager";
import * as getSwipingPropsObject from "../../src/core/slide-swiping/getSwipingProps";
import * as setUpLightboxOpenerObject from "../../src/core/main-component/opening/setUpLightboxOpener";
import * as setUpEventsDispatcherObject from "../../src/core/events/setUpEventsDispatcher";
import * as setUpSlideSwipingMoveObject from "../../src/core/slide-swiping/events/setUpSlideSwipingMove";
import * as setUpSourceControllerObject from "../../src/core/sources/setUpSourceLoadActions";
import * as setUpSourcesFactoryObject from "../../src/core/sources/creating/createSources";
import * as setUpFullscreenTogglerObject from "../../src/core/fullscreen/setUpFullscreenToggler";
import * as setUpGlobalResizingControllerObject from "../../src/core/sizes/setUpWindowResizeActions";
import * as setUpDocumentKeyDownEventControllerObject
    from "../../src/core/events/document/setUpDocumentKeyDownEventController";
import * as setUpWindowResizeEventControllerObject
    from "../../src/core/events/window/resize/setUpWindowResizeEventController";
import * as setUpSwipingEventsControllersFacadeObject
    from "../../src/core/events/facades/setUpSwipingEventsControllersFacade";
import * as setUpKeyboardControllerObject from "../../src/core/keyboard/setUpKeyboardController";
import * as setUpLightboxCloserObject from "../../src/core/main-component/closing/setUpLightboxCloser";
import * as setUpLightboxOpeningActionsObject from "../../src/core/main-component/opening/setUpLightboxOpeningActions";
import * as setUpLightboxUpdaterObject from "../../src/core/main-component/updating/setUpLightboxUpdater";
import * as setUpScrollbarRecompensorObject from "../../src/core/scrollbar/setUpScrollbarRecompensor";
import * as setUpSlideChangeFacadeObject from '../../src/core/slide/setUpSlideChangeFacade';
import * as setUpSlideIndexChangerObject from "../../src/core/slide/setUpSlideIndexChanger";
import * as setUpSlideSwipingDownObject from "../../src/core/slide-swiping/events/setUpSlideSwipingDown";
import * as setUpSlideSwipingUpObject from "../../src/core/slide-swiping/events/setUpSlideSwipingUp";
import * as setUpStageManagerObject from "../../src/core/stage/setUpStageManager";
import { setUpCore } from "../../src/core/setUpCore";

const fsLightbox = { key: 'fsLightbox' };
const swipingProps = { key: 'swipingProps' };

beforeAll(() => {
    setUpClassListsManagerObject.setUpClassListsManager = jest.fn();
    setUpEventsDispatcherObject.setUpEventsDispatcher = jest.fn();
    setUpLightboxOpenerObject.setUpLightboxOpener = jest.fn();
    setUpSourceControllerObject.setUpSourceLoadActions = jest.fn();
    setUpSourcesFactoryObject.createSources = jest.fn();
    setUpFullscreenTogglerObject.setUpFullscreenToggler = jest.fn();
    setUpGlobalResizingControllerObject.setUpWindowResizeActions = jest.fn();
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
    setUpCore(fsLightbox);
});

describe('calling correct methods which set up core', () => {
    it('should call setUpClassListsManager', () => {
        expect(setUpClassListsManagerObject.setUpClassListsManager).toBeCalledWith(fsLightbox);
    });

    describe('eventsControllers', () => {
        describe('document', () => {
            it('should call setUpDocumentKeyDownEventController', () => {
                expect(setUpDocumentKeyDownEventControllerObject.setUpDocumentKeyDownEventController).toBeCalledWith(fsLightbox);
            });
        });

        describe('window', () => {
            it('should call setUpWindowResizeEventController', () => {
                expect(setUpWindowResizeEventControllerObject.setUpWindowResizeEventController).toBeCalledWith(fsLightbox);
            });

            it('should call setUpSwipingEventsControllersFacade', () => {
                expect(setUpSwipingEventsControllersFacadeObject.setUpSwipingEventsControllersFacade).toBeCalledWith(fsLightbox);
            });
        });
    });

    it('should call setUpEventsDispatcher', () => {
        expect(setUpEventsDispatcherObject.setUpEventsDispatcher).toBeCalled();
    });

    it('should call setUpLightboxOpener', () => {
        expect(setUpLightboxOpenerObject.setUpLightboxOpener).toBeCalledWith(fsLightbox);
    });

    it('should call setUpScrollbarRecompensor', () => {
        expect(setUpScrollbarRecompensorObject.setUpScrollbarRecompensor).toBeCalledWith(fsLightbox);
    });
    it('should call setUpFullscreenToggler', () => {
        expect(setUpFullscreenTogglerObject.setUpFullscreenToggler).toBeCalledWith(fsLightbox);
    });

    it('should call setUpWindowResizeActions', () => {
        expect(setUpGlobalResizingControllerObject.setUpWindowResizeActions).toBeCalledWith(fsLightbox);
    });

    it('should call setUpKeyboardController', () => {
        expect(setUpKeyboardControllerObject.setUpKeyboardController).toBeCalledWith(fsLightbox);
    });

    it('should call setUpLightboxCloser', () => {
        expect(setUpLightboxCloserObject.setUpLightboxCloser).toBeCalledWith(fsLightbox);
    });

    it('should call setUpLightboxOpeningActions', () => {
        expect(setUpLightboxOpeningActionsObject.setUpLightboxOpeningActions).toBeCalledWith(fsLightbox);
    });

    it('should call setUpLightboxUpdater', () => {
        expect(setUpLightboxUpdaterObject.setUpLightboxUpdater).toBeCalledWith(fsLightbox);
    });

    it('should call setUpSlideChangeFacade', () => {
        expect(setUpSlideChangeFacadeObject.setUpSlideChangeFacade).toBeCalledWith(fsLightbox);
    });

    it('should call setUpSlideIndexChanger', () => {
        expect(setUpSlideIndexChangerObject.setUpSlideIndexChanger).toBeCalledWith(fsLightbox);
    });

    describe('slideSwiping', () => {
        it('should call setUpSlideSwiping', () => {
            expect(setUpSlideSwipingDownObject.setUpSlideSwipingDown).toBeCalledWith(fsLightbox, swipingProps);
        });

        it('should call setUpSlideSwipingMove', () => {
            expect(setUpSlideSwipingMoveObject.setUpSlideSwipingMove).toBeCalledWith(fsLightbox, swipingProps);
        });

        it('should call setUpSlideSwipingUp', () => {
            expect(setUpSlideSwipingUpObject.setUpSlideSwipingUp).toBeCalledWith(fsLightbox, swipingProps);
        });
    });

    it('should call setUpSourceLoadActions', () => {
        expect(setUpSourceControllerObject.setUpSourceLoadActions).toBeCalledWith(fsLightbox);
    });

    it('should call setUpStageManager', () => {
        expect(setUpStageManagerObject.setUpStageManager).toBeCalledWith(fsLightbox);
    });
});
