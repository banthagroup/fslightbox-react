import { setUpSwipingEventsControllersFacade } from "../../../../src/core/events/facades/setUpSwipingEventsControllersFacade";
import { WindowMoveEventController } from "../../../../src/core/events/window/move/WindowMoveEventController";
import { WindowUpEventController } from "../../../../src/core/events/window/up/WindowUpEventController";

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

describe('attachListeners', () => {
    beforeEach(() => {
        swipingEventsControllersFacade.attachListeners();
    });

    it('should call attachListener in WindowMoveEventController', () => {
        expect(windowMoveEventController.attachListener).toBeCalled();
    });

    it('should call attachListener in WindowUpEventController', () => {
        expect(windowUpEventController.attachListener).toBeCalled();
    });
});

describe('removeListeners', () => {
    beforeEach(() => {
        swipingEventsControllersFacade.removeListeners();
    });

    it('should call removeListener in WindowMoveEventController', () => {
        expect(windowMoveEventController.removeListener).toBeCalled();
    });

    it('should call removeListener in WindowUpEventController', () => {
        expect(windowUpEventController.removeListener).toBeCalled();
    });
});
