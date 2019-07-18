import { setUpSwipingEventsControllersFacade } from "./setUpSwipingEventsControllersFacade";
import { WindowMoveEventController } from "../window/move/WindowMoveEventController";
import { WindowUpEventController } from "../window/up/WindowUpEventController";

const swipingEventsControllersFacade = {};
let windowMoveEventController = {
    attachListener: () => {},
    removeListener: () => {},
};
let windowUpEventController = {
    attachListener: () => {},
    removeListener: () => {}
};
const fsLightbox = {
    injector: {
        injectDependency: (dependency) => {
            if (dependency === WindowMoveEventController) return windowMoveEventController;
            if (dependency === WindowUpEventController) return windowUpEventController;
        }
    },
    core: {
        eventsControllers: {
            window: {
                swiping: swipingEventsControllersFacade

            }
        }
    }
};

setUpSwipingEventsControllersFacade(fsLightbox);

beforeEach(() => {
    windowMoveEventController.attachListener = jest.fn();
    windowMoveEventController.removeListener = jest.fn();
    windowUpEventController.attachListener = jest.fn();
    windowUpEventController.removeListener = jest.fn();
});

test('attachListeners', () => {
    swipingEventsControllersFacade.attachListeners();
    expect(windowMoveEventController.attachListener).toBeCalled();
    expect(windowUpEventController.attachListener).toBeCalled();
});

test('removeListeners', () => {
    swipingEventsControllersFacade.removeListeners();
    expect(windowMoveEventController.removeListener).toBeCalled();
    expect(windowUpEventController.removeListener).toBeCalled();
});
