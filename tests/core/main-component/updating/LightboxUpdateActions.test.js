import { LightboxUpdateActions } from "../../../../src/core/main-component/updating/LightboxUpdateActions";

const fsLightbox = {
    core: {
        lightboxCloser: {
            closeLightbox: () => {}
        },
        lightboxOpener: {
            openLightbox: () => {}
        },
        slideIndexChanger: {
            changeSlideTo: () => {}
        }
    },
    getState: () => lightboxState,
    stageIndexes: {
        current: undefined
    }
};

const lightboxState = {
    isOpen: undefined
};

const lightboxCloser = fsLightbox.core.lightboxCloser;
const lightboxOpener = fsLightbox.core.lightboxOpener;
const slideIndexChanger = fsLightbox.core.slideIndexChanger;

const lightboxUpdateActions = new LightboxUpdateActions(fsLightbox);

describe('runTogglerUpdateActions', () => {
    beforeEach(() => {
        lightboxCloser.closeLightbox = jest.fn();
        lightboxOpener.openLightbox = jest.fn();
    });

    it('should open lightbox when isOpen state === false', () => {
        lightboxState.isOpen = false;
        lightboxUpdateActions.runTogglerUpdateActions();
        expect(lightboxCloser.closeLightbox).not.toBeCalled();
        expect(lightboxOpener.openLightbox).toBeCalled();
    });

    it('should close lightbox when isOpen state === true', () => {
        lightboxState.isOpen = true;
        lightboxUpdateActions.runTogglerUpdateActions();
        expect(lightboxCloser.closeLightbox).toBeCalled();
        expect(lightboxOpener.openLightbox).not.toBeCalled();
    });
});

describe('runCurrentStateIndexUpdateActionsFor', () => {
    beforeEach(() => {
        fsLightbox.stageIndexes.current = 0;
        slideIndexChanger.changeToWithActions = jest.fn();
    });

    describe('lightbox is closed', () => {
        beforeEach(() => {
            lightboxState.isOpen = false;
        });

        it(`should not set new current stage index and call changeToWithActions
            due to previous slide source index === new slide source index`, () => {
            lightboxUpdateActions.runCurrentStageIndexUpdateActionsFor(0);
            expect(slideIndexChanger.changeToWithActions).not.toBeCalled();
        });

        it(`should set new current stage index and not call changeToWithAction 
            due to lightbox is closed and previous slide index !== new slide index`, () => {
            lightboxUpdateActions.runCurrentStageIndexUpdateActionsFor(5);
            expect(fsLightbox.stageIndexes.current).toBe(5);
            expect(slideIndexChanger.changeToWithActions).not.toBeCalled();
        });
    });

    describe('lightbox is opened', () => {
        beforeEach(() => {
            lightboxState.isOpen = true;
        });

        it(`should not set new current stage index and call changeToWithActions
            due to previous slide source index === new slide source index`, () => {
            lightboxUpdateActions.runCurrentStageIndexUpdateActionsFor(0);
            expect(slideIndexChanger.changeToWithActions).not.toBeCalled();
        });

        it(`should change slide with actions and not set new current stage index
            due to lightbox is opened and previous slide index !== new slide index`, () => {
            lightboxUpdateActions.runCurrentStageIndexUpdateActionsFor(5);
            expect(fsLightbox.stageIndexes.current).toBe(0);
            expect(slideIndexChanger.changeToWithActions).toBeCalledWith(5);
        });
    });
});
