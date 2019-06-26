import { setUpWindowResizeEventController } from "../../../../../src/core/events/window/resize/setUpWindowResizeEventController";

const windowResizeEventController = {};
const fsLightbox = {
    core: {
        eventsControllers: {
            window: {
                resize: windowResizeEventController
            }
        },
        windowResizeActions: {
            runActions: () => {},
        }
    }
};

setUpWindowResizeEventController(fsLightbox);

describe('attachListener', () => {
    beforeAll(() => {
        window.addEventListener = jest.fn();
        windowResizeEventController.attachListener();
    });

    it('should call addEventListener with resize string and runActions method', () => {
        expect(window.addEventListener).toBeCalledWith('resize', fsLightbox.core.windowResizeActions.runActions);
    });
});

describe('removeListener', () => {
    beforeAll(() => {
        window.removeEventListener = jest.fn();
        windowResizeEventController.removeListener();
    });

    it('should call removeEventListener with resize string and runActions method', () => {
        expect(window.removeEventListener).toBeCalledWith('resize', fsLightbox.core.windowResizeActions.runActions);
    });
});
