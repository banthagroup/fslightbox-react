import { setUpLightboxOpener } from "./setUpLightboxOpener";

const fsLightbox = {
    setMainComponentState: () => {},
    core: {
        lightboxOpeningActions: {
            runActions: () => {}
        },
        lightboxOpener: {}
    }
};

const lightboxOpeningActions = fsLightbox.core.lightboxOpeningActions;

const lightboxOpener = fsLightbox.core.lightboxOpener;

let state;

test('simple actions', () => {
    lightboxOpeningActions.runActions = jest.fn();
    fsLightbox.setMainComponentState = (stateObject, callback) => {
        state = stateObject;
        callback();
    };
    setUpLightboxOpener(fsLightbox);
    lightboxOpener.openLightbox();

    expect(state).toEqual({ isOpen: true });
    expect(fsLightbox.core.lightboxOpeningActions.runActions).toBeCalled();
});
