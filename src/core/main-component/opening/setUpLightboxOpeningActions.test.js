import { setUpLightboxOpeningActions } from "./setUpLightboxOpeningActions";
import { ON_OPEN, ON_SHOW } from "../../../constants/events-constants";
import * as initializeLightboxObject from "../../main-component/initializing/initializeLightbox";
import { OPEN_CLASS_NAME } from "../../../constants/classes-names";

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

test('simple actions', () => {
    expect(stageManager.updateStageIndexes).toBeCalled();
    expect(document.documentElement.classList.add).toBeCalledWith(OPEN_CLASS_NAME);
    expect(windowResizeActions.runActions).toBeCalled();
    expect(scrollbarRecompensor.addRecompense).toBeCalled();
    expect(windowResizeEventController.attachListener).toBeCalled();
    expect(swipingEventsController.attachListeners).toBeCalled();
    expect(documentKeyDownEventController.attachListener).toBeCalled();
    expect(eventsDispatcher.dispatch).toBeCalledWith(ON_OPEN);
});

describe('calling actions depending on isInitialized', () => {
    beforeEach(() => {
        initializeLightboxObject.initializeLightbox = jest.fn();
        eventsDispatcher.dispatch = jest.fn();
    });

    test('lightbox is already initialized', () => {
        fsLightbox.data.isInitialized = true;
        lightboxOpeningActions.runActions();

        expect(initializeLightboxObject.initializeLightbox).not.toBeCalled();
        expect(eventsDispatcher.dispatch).toBeCalledWith(ON_SHOW);
    });

    test('lightbox is not initialized', () => {
        fsLightbox.data.isInitialized = false;
        lightboxOpeningActions.runActions();

        expect(initializeLightboxObject.initializeLightbox).toBeCalled();
        expect(eventsDispatcher.dispatch).not.toBeCalledWith(ON_SHOW);
    });
});
