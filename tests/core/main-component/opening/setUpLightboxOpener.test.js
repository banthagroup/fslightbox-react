import { setUpLightboxOpener } from "../../../../src/core/main-component/opening/setUpLightboxOpener";

const lightboxOpener = {};
const fsLightbox = {
    setters: {
        setState: () => {}
    },
    core: {
        lightboxOpeningActions: {
            runActions: () => {}
        },
        lightboxOpener: lightboxOpener
    }
};

const recreateLightboxOpenerAndCallOpenLightbox = () => {
    setUpLightboxOpener(fsLightbox);
    lightboxOpener.openLightbox();
};

describe('openLightbox', () => {
    let state;

    beforeAll(() => {
        fsLightbox.core.lightboxOpeningActions.runActionsForEvent = jest.fn();
        fsLightbox.setters.setState = jest.fn((stateObject, callback) => {
            state = stateObject;
            callback();
        });
        recreateLightboxOpenerAndCallOpenLightbox()
    });

    it('should call setState', () => {
        expect(fsLightbox.setters.setState).toBeCalled();
    });

    it('should set state to object with toggler set to true', () => {
        expect(state).toEqual({ isOpen: true });
    });

    it('should call runActionsForSourceTypeAndIndex', () => {
        expect(fsLightbox.core.lightboxOpeningActions.runActions).toBeCalled();
    });
});
