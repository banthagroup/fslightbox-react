import { setUpLightboxOpener } from "./setUpLightboxOpener";

const fsLightbox = {
    setMainComponentState: () => {},
    core: {
        lightboxOpenActions: {
            runActions: () => {}
        },
        lightboxOpener: {}
    }
};

const lightboxOpenActions = fsLightbox.core.lightboxOpenActions;

const lightboxOpener = fsLightbox.core.lightboxOpener;

let state;

test('simple actions', () => {
    lightboxOpenActions.runActions = jest.fn();
    fsLightbox.setMainComponentState = (stateObject, callback) => {
        state = stateObject;
        callback();
    };
    setUpLightboxOpener(fsLightbox);
    lightboxOpener.openLightbox();

    expect(state).toEqual({ isOpen: true });
    expect(fsLightbox.core.lightboxOpenActions.runActions).toBeCalled();
});
