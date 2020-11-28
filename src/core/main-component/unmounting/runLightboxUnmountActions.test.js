import { runLightboxUnmountActions } from "./runLightboxUnmountActions";

const abort = jest.fn();

const fsLightbox = {
    collections: {
        xhrs: [
            {
                abort: abort,
            },
            {
                abort: abort,
            },
            {
                abort: abort,
            },
            {
                abort: abort,
            },
            {
                abort: abort,
            },
        ]
    },
    componentsServices: {
        isLightboxOpenManager: {
            get: () => false
        }
    },
    core: {
        globalEventsController: { removeListeners: jest.fn() }
    }
};

test('calling abort for all xhrs', () => {
    runLightboxUnmountActions(fsLightbox);
    expect(abort).toBeCalledTimes(5);
    expect(fsLightbox.core.globalEventsController.removeListeners).not.toBeCalled();

    fsLightbox.componentsServices.isLightboxOpenManager.get = () => true;
    runLightboxUnmountActions(fsLightbox);
    expect(fsLightbox.core.globalEventsController.removeListeners).toBeCalled();
});
