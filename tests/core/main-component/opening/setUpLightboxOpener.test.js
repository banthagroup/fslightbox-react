import { setUpLightboxOpener } from "../../../../src/core/main-component/opening/setUpLightboxOpener";

const fsLightbox = {
    setters: {
        setState: () => {}
    },
    core: {
        lightboxOpeningActions: {
            runActions: () => {}
        },
        lightboxOpener: {}
    }
};

const lightboxOpeningActions = fsLightbox.core.lightboxOpeningActions;

const lightboxOpener = fsLightbox.core.lightboxOpener;

describe('openLightbox', () => {
    let state;

    beforeAll(() => {
        lightboxOpeningActions.runActions = jest.fn();
        fsLightbox.setters.setState = jest.fn((stateObject, callback) => {
            state = stateObject;
            callback();
        });
        setUpLightboxOpener(fsLightbox);
        lightboxOpener.openLightbox();
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
