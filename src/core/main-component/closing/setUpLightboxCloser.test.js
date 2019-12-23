import { setUpLightboxCloser } from "./setUpLightboxCloser";

const fsLightbox = {
    core: {
        lightboxCloser: {},
        lightboxCloseActioner: {
            isLightboxFadingOut: true,
            runActions: jest.fn()
        }
    }
};
const lightboxCloser = fsLightbox.core.lightboxCloser;
setUpLightboxCloser(fsLightbox);

test('closeLightbox', () => {
    lightboxCloser.closeLightbox();
    expect(fsLightbox.core.lightboxCloseActioner.runActions).not.toBeCalled();

    fsLightbox.core.lightboxCloseActioner.isLightboxFadingOut = false;
    lightboxCloser.closeLightbox();
    expect(fsLightbox.core.lightboxCloseActioner.runActions).toBeCalled();
}); 
