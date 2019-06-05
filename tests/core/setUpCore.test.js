import * as getSwipingPropsObject from "../../src/core/slide-swiping/getSwipingProps";
import * as setUpLightboxOpenerObject from "../../src/core/main-component/opening/setUpLightboxOpener";
import * as setUpSlideChangerObject from "../../src/core/slide/slide-changing/setUpSlideChanger";
import * as setUpSlideSwipingMoveObject from "../../src/core/slide-swiping/events/setUpSlideSwipingMove";
import * as setUpSourceControllerObject from "../../src/core/sources/setUpSourceController";
import * as setUpSourceHoldersTransformerObject from "../../src/core/transforms/setUpSourceHoldersTransformer";
import * as setUpSourcesFactoryObject from "../../src/core/sources/creating/createSources";
import * as setUpFullscreenTogglerObject from "../../src/core/fullscreen/setUpFullscreenToggler";
import * as setUpGlobalResizingControllerObject from "../../src/core/sizes/setUpGlobalResizingController";
import * as setUpDocumentKeyDownEventControllerObject
    from "../../src/core/events-controllers/document/setUpDocumentKeyDownEventController";
import * as setUpWindowResizeEventControllerObject
    from "../../src/core/events-controllers/window/resize/setUpWindowResizeEventController";
import * as setUpSwipingEventsControllersFacadeObject
    from "../../src/core/events-controllers/facades/setUpSwipingEventsControllersFacade";
import * as setUpKeyboardControllerObject from "../../src/core/keyboard/setUpKeyboardController";
import * as setUpLightboxCloserObject from "../../src/core/main-component/closing/setUpLightboxCloser";
import * as setUpLightboxOpeningActionsObject from "../../src/core/main-component/opening/setUpLightboxOpeningActions";
import * as setUpLightboxUpdaterObject from "../../src/core/main-component/updating/setUpLightboxUpdater";
import * as setUpScrollbarRecompensorObject from "../../src/core/scrollbar/setUpScrollbarRecompensor";
import * as setUpSlideSwipingDownObject from "../../src/core/slide-swiping/events/setUpSlideSwipingDown";
import * as setUpSlideSwipingUpObject from "../../src/core/slide-swiping/events/setUpSlideSwipingUp";
import * as setUpSourceAnimatorObject from "../../src/core/animations/setUpSourceAnimator";
import * as setUpStageObject from "../../src/core/stage/setUpStage";
import { setUpCore } from "../../src/core/setUpCore";

const fsLightbox = { key: 'fsLightbox' };
const swipingProps = { key: 'swipingProps' };

beforeAll(() => {
    setUpLightboxOpenerObject.setUpLightboxOpener = jest.fn();
    setUpSlideChangerObject.setUpSlideChanger = jest.fn();
    setUpSourceControllerObject.setUpSourceController = jest.fn();
    setUpSourceHoldersTransformerObject.setUpSourceHoldersTransformer = jest.fn();
    setUpSourcesFactoryObject.createSources = jest.fn();
    setUpFullscreenTogglerObject.setUpFullscreenToggler = jest.fn();
    setUpGlobalResizingControllerObject.setUpGlobalResizingController = jest.fn();
    setUpDocumentKeyDownEventControllerObject.setUpDocumentKeyDownEventController = jest.fn();
    setUpWindowResizeEventControllerObject.setUpWindowResizeEventController = jest.fn();
    setUpSwipingEventsControllersFacadeObject.setUpSwipingEventsControllersFacade = jest.fn();
    setUpKeyboardControllerObject.setUpKeyboardController = jest.fn();
    setUpLightboxCloserObject.setUpLightboxCloser = jest.fn();
    setUpLightboxOpeningActionsObject.setUpLightboxOpeningActions = jest.fn();
    setUpLightboxUpdaterObject.setUpLightboxUpdater = jest.fn();
    setUpScrollbarRecompensorObject.setUpScrollbarRecompensor = jest.fn();
    getSwipingPropsObject.getSwipingProps = () => swipingProps;
    setUpSlideSwipingMoveObject.setUpSlideSwipingMove = jest.fn();
    setUpSlideSwipingDownObject.setUpSlideSwipingDown = jest.fn();
    setUpSlideSwipingUpObject.setUpSlideSwipingUp = jest.fn();
    setUpSourceAnimatorObject.setUpSourceAnimator = jest.fn();
    setUpStageObject.setUpStage = jest.fn();
    setUpCore(fsLightbox);
});

describe('calling correct methods which set up core', () => {
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

    it('should call setUpLightboxOpener', () => {
        expect(setUpLightboxOpenerObject.setUpLightboxOpener).toBeCalledWith(fsLightbox);
    });

    it('should call setUpSlideChanger', () => {
        expect(setUpSlideChangerObject.setUpSlideChanger).toBeCalledWith(fsLightbox);
    });

    it('should call setUpScrollbarRecompensor', () => {
        expect(setUpScrollbarRecompensorObject.setUpScrollbarRecompensor).toBeCalledWith(fsLightbox);
    });
    it('should call setUpFullscreenToggler', () => {
        expect(setUpFullscreenTogglerObject.setUpFullscreenToggler).toBeCalledWith(fsLightbox);
    });

    it('should call setUpGlobalResizingController', () => {
        expect(setUpGlobalResizingControllerObject.setUpGlobalResizingController).toBeCalledWith(fsLightbox);
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

    describe('slideSwiping', () => {
        it('should call setUpSlideSwipingDown', () => {
            expect(setUpSlideSwipingDownObject.setUpSlideSwipingDown).toBeCalledWith(fsLightbox, swipingProps);
        });

        it('should call setUpSlideSwipingMove', () => {
            expect(setUpSlideSwipingMoveObject.setUpSlideSwipingMove).toBeCalledWith(fsLightbox, swipingProps);
        });

        it('should call setUpSlideSwipingUp', () => {
            expect(setUpSlideSwipingUpObject.setUpSlideSwipingUp).toBeCalledWith(fsLightbox, swipingProps);
        });
    });

    it('should call setUpSourceAnimator', () => {
        expect(setUpSourceAnimatorObject.setUpSourceAnimator).toBeCalledWith(fsLightbox);
    });

    it('should call setUpSourceController', () => {
        expect(setUpSourceControllerObject.setUpSourceController).toBeCalledWith(fsLightbox);
    });

    it('should call setUpSourceHoldersTransformer', () => {
        expect(setUpSourceHoldersTransformerObject.setUpSourceHoldersTransformer).toBeCalledWith(fsLightbox);
    });

    it('should call setUpStage', () => {
        expect(setUpStageObject.setUpStage).toBeCalledWith(fsLightbox);
    });
});
