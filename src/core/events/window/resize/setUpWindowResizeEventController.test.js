import { setUpWindowResizeEventController } from "./setUpWindowResizeEventController";

const windowResizeEventController = {};
const fsLightbox = {
    core: {
        eventsControllers: {
            window: {
                resize: windowResizeEventController
            }
        },
        windowResizeActioner: {
            runActions: () => {},
        }
    }
};

setUpWindowResizeEventController(fsLightbox);

test('attachListener', () => {
    addEventListener = jest.fn();

    windowResizeEventController.attachListener();

    expect(addEventListener).toBeCalledWith('resize', fsLightbox.core.windowResizeActioner.runActions);
});

test('removeListener', () => {
    removeEventListener = jest.fn();

    windowResizeEventController.removeListener();

    expect(removeEventListener).toBeCalledWith('resize', fsLightbox.core.windowResizeActioner.runActions);
});
