import { runLightboxUnmountActions } from "../../../src/core/main-component/runLightboxUnmountActions";

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
};

describe('calling abort for all xhrs', () => {
    beforeAll(() => {
        runLightboxUnmountActions(fsLightbox);
    });

    it('should call abort 5 times', () => {
        expect(abort).toBeCalledTimes(5);
    });
});