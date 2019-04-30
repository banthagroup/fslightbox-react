import { setUpWindowResizeEventController } from "../../../../../src/core/events-controllers/window/resize/setUpWindowResizeEventController";

const windowResizeEventController = {};
const fsLightbox = {
    core: {
        eventsControllers: {
            window: {
                resize: windowResizeEventController
            }
        },
        globalResizingController: {
            runAllResizingActions: () => {},
        }
    }
};

setUpWindowResizeEventController(fsLightbox);

describe('attachListener', () => {
    beforeAll(() => {
        window.addEventListener = jest.fn();
        windowResizeEventController.attachListener();
    });

    it('should call addEventListener with resize string and runAllResizingActions method', () => {
        expect(window.addEventListener).toBeCalledWith('resize', fsLightbox.core.globalResizingController.runAllResizingActions);
    });
});

describe('removeListener', () => {
    beforeAll(() => {
        window.removeEventListener = jest.fn();
        windowResizeEventController.removeListener();
    });

    it('should call removeEventListener with resize string and runAllResizingActions method', () => {
        expect(window.removeEventListener).toBeCalledWith('resize', fsLightbox.core.globalResizingController.runAllResizingActions);
    });
});