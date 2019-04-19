import { LightboxUnmounter } from "../../../src/core/main-component/LightboxUnmounter";

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
const lightboxUnmounter = new LightboxUnmounter(fsLightbox);

describe('calling abort for all xhrs', () => {
    beforeAll(() => {
        lightboxUnmounter.callUnmountActions();
    });

    it('should call abort 5 times', () => {
        expect(abort).toBeCalledTimes(5);
    });
});