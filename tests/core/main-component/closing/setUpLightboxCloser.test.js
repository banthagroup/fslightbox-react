import { setUpLightboxCloser } from "../../../../src/core/main-component/closing/setUpLightboxCloser";

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

describe('calling runActionsForSourceTypeAndIndex - lightbox is not fading out', () => {
    beforeEach(() => {
        lightboxClosingActions.isLightboxFadingOut = false;
        lightboxCloser.closeLightbox();
    });

    it('should call runActionsForSourceTypeAndIndex', () => {
        expect(lightboxClosingActions.runActions).toBeCalled();
    });
});

describe('not calling actions - lightbox is fading out', () => {
    beforeEach(() => {
        lightboxClosingActions.isLightboxFadingOut = true;
        lightboxCloser.closeLightbox();
    });

    it('should call runActionsForSourceTypeAndIndex only 1 time', () => {
        expect(lightboxClosingActions.runActions).not.toBeCalled();
    });
});
