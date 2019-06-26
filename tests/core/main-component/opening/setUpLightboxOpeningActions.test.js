import { setUpLightboxOpeningActions } from "../../../../src/core/main-component/opening/setUpLightboxOpeningActions";
import { ON_OPEN, ON_SHOW } from "../../../../src/constants/eventsConstants";
import * as initializeLightboxObject from "../../../../src/core/main-component/initializing/initializeLightbox";
import { OPEN_CLASS_NAME } from "../../../../src/constants/classes-names";

const fsLightbox = {
    data: {
        isInitialized: false
    },
    eventsDispatcher: {
        dispatch: () => {},
    },
    core: {
        eventsControllers: {
            window: {
                resize: {
                    attachListener: () => {}
                },
                swiping: {
                    attachListeners: () => {}
                }
            },
            document: {
                keyDown: {
                    attachListener: () => {}
                }
            }
        },
        eventsDispatcher: {
            dispatch: () => {},
        },
        lightboxOpeningActions: {},
        scrollbarRecompensor: {
            addRecompense: () => {}
        },
        stageManager: {
            updateStageIndexes: () => {}
        },
        windowResizeActions: {
            runActions: () => {}
        }
    }
};

const windowResizeEventController = fsLightbox.core.eventsControllers.window.resize;
const swipingEventsController = fsLightbox.core.eventsControllers.window.swiping;
const documentKeyDownEventController = fsLightbox.core.eventsControllers.document.keyDown;
const eventsDispatcher = fsLightbox.core.eventsDispatcher;
const scrollbarRecompensor = fsLightbox.core.scrollbarRecompensor;
const stageManager = fsLightbox.core.stageManager;
const windowResizeActions = fsLightbox.core.windowResizeActions;

const lightboxOpeningActions = fsLightbox.core.lightboxOpeningActions;
setUpLightboxOpeningActions(fsLightbox);

describe('runActions', () => {
    beforeAll(() => {
        stageManager.updateStageIndexes = jest.fn();
        document.documentElement.classList.add = jest.fn();
        windowResizeActions.runActions = jest.fn();
        scrollbarRecompensor.addRecompense = jest.fn();
        windowResizeEventController.attachListener = jest.fn();
        swipingEventsController.attachListeners = jest.fn();
        documentKeyDownEventController.attachListener = jest.fn();
        eventsDispatcher.dispatch = jest.fn();
        initializeLightboxObject.initializeLightbox = () => {};
        lightboxOpeningActions.runActions();
    });

    it('should update stage indexes', () => {
        expect(stageManager.updateStageIndexes).toBeCalled();
    });

    it('should add open class to document', () => {
        expect(document.documentElement.classList.add).toBeCalledWith(OPEN_CLASS_NAME);
    });

    it('should run resizeActions', () => {
        expect(windowResizeActions.runActions).toBeCalled();
    });

    it('should add recompense to scrollbar', () => {
        expect(scrollbarRecompensor.addRecompense).toBeCalled();
    });

    it('should attach window resize listener', () => {
        expect(windowResizeEventController.attachListener).toBeCalled();
    });

    it('should attach swiping listeners', () => {
        expect(swipingEventsController.attachListeners).toBeCalled();
    });

    it('should attach document key down listener', () => {
        expect(documentKeyDownEventController.attachListener).toBeCalled();
    });

    it('should dispatch on open event', () => {
        expect(eventsDispatcher.dispatch).toBeCalledWith(ON_OPEN);
    });

    describe('calling actions depending on isInitialized', () => {
        describe('lightbox is already initialized', () => {
            beforeAll(() => {
                initializeLightboxObject.initializeLightbox = jest.fn();
                fsLightbox.data.isInitialized = true;
                eventsDispatcher.dispatch = jest.fn();
                lightboxOpeningActions.runActions();
            });

            it('should not call initialize', () => {
                expect(initializeLightboxObject.initializeLightbox).not.toBeCalled();
            });

            it('should call onShow', () => {
                expect(eventsDispatcher.dispatch).toBeCalledWith(ON_SHOW);
            });
        });

        describe('lightbox is not initialized', () => {
            beforeAll(() => {
                initializeLightboxObject.initializeLightbox = jest.fn();
                fsLightbox.data.isInitialized = false;
                eventsDispatcher.dispatch = jest.fn();
                lightboxOpeningActions.runActions();
            });

            it('should call initialize', () => {
                expect(initializeLightboxObject.initializeLightbox).toBeCalled();
            });

            it('should not call onShow', () => {
                expect(eventsDispatcher.dispatch).not.toBeCalledWith(ON_SHOW);
            });
        });
    });
});
