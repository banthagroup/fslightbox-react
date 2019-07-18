import { setUpWindowResizeEventController } from "./setUpWindowResizeEventController";

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

test('attachListener', () => {
    addEventListener = jest.fn();

    windowResizeEventController.attachListener();

    expect(addEventListener).toBeCalledWith('resize', fsLightbox.core.windowResizeActions.runActions);
});

test('removeListener', () => {
    removeEventListener = jest.fn();

    windowResizeEventController.removeListener();

    expect(removeEventListener).toBeCalledWith('resize', fsLightbox.core.windowResizeActions.runActions);
});
