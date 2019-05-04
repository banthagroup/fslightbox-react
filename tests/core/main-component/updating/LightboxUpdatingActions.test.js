import { LightboxUpdatingActions } from "../../../../src/core/main-component/updating/LightboxUpdatingActions";

const fsLightbox = {
    data: {
        slideOnLightboxOpen: 0
    },
    getters: {
        getIsOpen: () => {},
        props: {
            getSlide: () => {},
            getToggler: () => {},
        }
    },
    core: {
        lightboxCloser: {
            closeLightbox: () => {}
        },
        lightboxOpener: {
            openLightbox: () => {}
        },
        slideChanger: {
            changeSlideTo: () => {}
        }
    }
};

let lightboxUpdatingActions;

const recreateActionsAndCallIsOpenHandler = () => {
    lightboxUpdatingActions = new LightboxUpdatingActions(fsLightbox);
    lightboxUpdatingActions.runIsOpenUpdateActions();
};

const recreateActionsAndCallSlideHandler = () => {
    lightboxUpdatingActions = new LightboxUpdatingActions(fsLightbox);
    lightboxUpdatingActions.runSlideUpdateActions();
};

describe('runIsOpenUpdateActions', () => {
    beforeEach(() => {
        fsLightbox.core.lightboxCloser.closeLightbox = jest.fn();
        fsLightbox.core.lightboxOpener.openLightbox = jest.fn();
    });

    describe('toggler state === false', () => {
        beforeEach(() => {
            fsLightbox.getters.getIsOpen = () => false;
            recreateActionsAndCallIsOpenHandler();
        });

        it('should not call closeLightbox', () => {
            expect(fsLightbox.core.lightboxCloser.closeLightbox).not.toBeCalled();
        });

        it('should call openLightbox', () => {
            expect(fsLightbox.core.lightboxOpener.openLightbox).toBeCalled();
        });
    });

    describe('toggler state === true', () => {
        beforeEach(() => {
            fsLightbox.getters.getIsOpen = () => true;
            recreateActionsAndCallIsOpenHandler();
        });

        it('should not call openLightbox', () => {
            expect(fsLightbox.core.lightboxOpener.openLightbox).not.toBeCalled();
        });

        it('should call closeLightbox', () => {
            expect(fsLightbox.core.lightboxCloser.closeLightbox).toBeCalled();
        });
    });
});


describe('runSlideUpdateActions', () => {
    beforeEach(() => {
        fsLightbox.getters.props.getSlide = () => 10;
        fsLightbox.data.slideOnLightboxOpen = 0;
        fsLightbox.core.slideChanger.changeSlideTo = jest.fn();
    });

    describe('isOpen state === false', () => {
        beforeEach(() => {
            fsLightbox.getters.getIsOpen = () => false;
            recreateActionsAndCallSlideHandler();
        });

        it('should not call changeSlideTo', () => {
            expect(fsLightbox.core.slideChanger.changeSlideTo).not.toBeCalled();
        });

        it('should set slideOnLightboxOpen to slide prop', () => {
            expect(fsLightbox.data.slideOnLightboxOpen).toBe(10);
        });
    });

    describe('isOpen state === true', () => {
        beforeEach(() => {
            fsLightbox.getters.getIsOpen = () => true;
            recreateActionsAndCallSlideHandler();
        });

        it('should not set slideOnLightboxOpen to slide prop', () => {
            expect(fsLightbox.data.slideOnLightboxOpen).toBe(0);
        });

        it('should call changeSlide to with slide as prop', () => {
            expect(fsLightbox.core.slideChanger.changeSlideTo).toBeCalledWith(10);
        });
    });
});