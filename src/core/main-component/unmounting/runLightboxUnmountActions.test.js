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
    core: {
        lightboxCloseActioner: { runActions: jest.fn() }
    },
    getState: () => {
        return {
            isOpen: false
        }
    }
};

test('calling abort for all xhrs', () => {
    runLightboxUnmountActions(fsLightbox);
    expect(abort).toBeCalledTimes(5);
    expect(fsLightbox.core.lightboxCloseActioner.runActions).not.toBeCalled();

    fsLightbox.getState = () => ({ isOpen: true });
    runLightboxUnmountActions(fsLightbox);
    expect(fsLightbox.core.lightboxCloseActioner.runActions).toBeCalled();
});
