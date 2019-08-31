import { setUpLightboxOpener } from "./setUpLightboxOpener";

const fsLightbox = {
    setMainComponentState: () => {},
    core: { lightboxOpenActioner: { runActions: jest.fn() }, lightboxOpener: {} }
};
const lightboxOpener = fsLightbox.core.lightboxOpener;
let state;
fsLightbox.setMainComponentState = (stateObject, callback) => {
    state = stateObject;
    callback();
};

test('simple actions', () => {
    setUpLightboxOpener(fsLightbox);
    lightboxOpener.openLightbox();

    expect(state).toEqual({ isOpen: true });
    expect(fsLightbox.core.lightboxOpenActioner.runActions).toBeCalled();
});
