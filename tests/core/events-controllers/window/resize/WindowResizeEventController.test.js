import { WindowResizeEventController } from "../../../../../src/core/events-controllers/window/resize/WindowResizeEventController";

const fsLightbox = {
    core: {
        globalResizingController: {
            runAllResizingActions: () => {},
        }
    }
};

/** @var { WindowResizeEventController } windowResizeEventController */
let windowResizeEventController;

beforeEach(() => {
    fsLightbox.core.globalResizingController.runAllResizingActions = jest.fn();
    windowResizeEventController = new WindowResizeEventController(fsLightbox);
});

describe('attachListener', () => {
    beforeEach(() => {
        windowResizeEventController.attachListener();
        dispatchEvent(new Event('resize'));
    });

    it('should call runAllResizingActions', () => {
        expect(fsLightbox.core.globalResizingController.runAllResizingActions).toBeCalled();
    });
});

describe('removeListener', () => {
    beforeEach(() => {
        // for first lets attach listener
        windowResizeEventController.attachListener();
        windowResizeEventController.removeListener();
        dispatchEvent(new Event('resize'));
    });

    it('should not call runAllResizingActions', () => {
        expect(fsLightbox.core.globalResizingController.runAllResizingActions).not.toBeCalled();
    });
});