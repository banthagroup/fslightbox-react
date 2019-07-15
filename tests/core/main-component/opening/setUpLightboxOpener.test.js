import { setUpLightboxOpener } from "../../../../src/core/main-component/opening/setUpLightboxOpener";

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

describe('openLightbox', () => {
    let state;

    beforeAll(() => {
        lightboxOpeningActions.runActions = jest.fn();
        fsLightbox.setMainComponentState = (stateObject, callback) => {
            state = stateObject;
            callback();
        };
        setUpLightboxOpener(fsLightbox);
        lightboxOpener.openLightbox();
    });

    it('should set state to object with toggler set to true', () => {
        expect(state).toEqual({ isOpen: true });
    });

    it('should call runActionsForSourceTypeAndIndex', () => {
        expect(fsLightbox.core.lightboxOpeningActions.runActions).toBeCalled();
    });
});
