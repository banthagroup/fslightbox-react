import { setUpLightboxCloser } from "./setUpLightboxCloser";

const lightboxCloser = {};
const lightboxClosingActions = {
    isLightboxFadingOut: false,
    runActions: () => {}
};
const fsLightbox = {
    injector: {
        injectDependency: () => lightboxClosingActions
    },
    core: {
        lightboxCloser: lightboxCloser
    }
};

setUpLightboxCloser(fsLightbox);

beforeEach(() => {
    lightboxClosingActions.runActions = jest.fn();
});

test('calling runActionsForSourceTypeAndIndex - lightbox is not fading out', () => {
    lightboxClosingActions.isLightboxFadingOut = false;
    lightboxCloser.closeLightbox();

    expect(lightboxClosingActions.runActions).toBeCalled();
});

test('not calling actions - lightbox is fading out', () => {
    lightboxClosingActions.isLightboxFadingOut = true;
    lightboxCloser.closeLightbox();

    expect(lightboxClosingActions.runActions).not.toBeCalled();
});
