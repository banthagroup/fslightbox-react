import { LightboxOpener } from "../../../../src/core/main-component/opening/LightboxOpener";

const openingActions = {
    runActions: () => {},
};
const fsLightbox = {
    setters: {
        setState: () => {}
    },
    injector: {
        mainComponent: {
            getOpeningActions: () => openingActions
        }
    }
};

/** @var { LightboxOpener } lightboxOpener */
let lightboxOpener;

const recreateLightboxOpenerAndCallOpenLightbox = () => {
    lightboxOpener = new LightboxOpener(fsLightbox);
    lightboxOpener.openLightbox();
};

describe('openLightbox', () => {
    let state;

    beforeAll(() => {
        openingActions.runActions = jest.fn();
        fsLightbox.setters.setState = jest.fn((stateObject, callback) => {
            state = stateObject;
            callback();
        });
        recreateLightboxOpenerAndCallOpenLightbox();
    });

    it('should call setState', () => {
        expect(fsLightbox.setters.setState).toBeCalled();
    });

    it('should set state to object with isOpen set to true', () => {
        expect(state).toEqual({ isOpen: true });
    });

    it('should call runActions', () => {
        expect(openingActions.runActions).toBeCalled();
    });
});