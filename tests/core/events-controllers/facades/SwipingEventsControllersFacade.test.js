import { SwipingEventsControllersFacade } from "../../../../src/core/events-controllers/facades/SwipingEventsControllersFacade";

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
        eventsControllers: {
            getWindowMoveEventController: () => windowMoveEventController,
            getWindowUpEventController: () => windowUpEventController
        }
    }
};
const swipingEventsControllersFacade = new SwipingEventsControllersFacade(fsLightbox);

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