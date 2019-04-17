import { FsLightboxMock } from "../../../../../__mocks__/components/fsLightboxMock";
import { WindowUpEventController } from "../../../../../../src/core/events-controllers/window/up/WindowUpEventController";

const fsLightboxMock = new FsLightboxMock();
/** @var { main-component } fsLightbox */
let fsLightbox;
/** @var { SlideSwipingUp } slideSwipingUp */
let slideSwipingUp;
/** @var { WindowUpEventController } windowUpEventController */
let windowUpEventController;

beforeEach(() => {
    fsLightboxMock.instantiateNewFsLightbox();
    fsLightbox = fsLightboxMock.getFsLightbox();
    slideSwipingUp = fsLightbox.core.slideSwiping.up;
});

describe('window mouseup event', () => {
    // on mouse move slide swiping move listener should be called so we can test attaching listener to window
    // testing if slide swiping move was called
    beforeEach(() => {
        windowUpEventController = new WindowUpEventController(fsLightbox);
        slideSwipingUp.listener = jest.fn();
    });

    describe('attaching mouseup event listener to window', () => {
        it('should not call slide swiping move listener', () => {
            dispatchEvent(new Event('mouseup'));
            expect(slideSwipingUp.listener).not.toBeCalled();
        });

        it('should call slide swiping move listener', () => {
            windowUpEventController.attachListener();
            dispatchEvent(new Event('mouseup'));
            expect(slideSwipingUp.listener).toBeCalled();
        });
    });

    describe('removing mouseup event listener from window', () => {
        beforeEach(() => {
            windowUpEventController.attachListener();
        });

        it('should call slide swiping move listener', () => {
            dispatchEvent(new Event('mouseup'));
            expect(slideSwipingUp.listener).toBeCalled();
        });

        it('should call slide swiping move listener', () => {
            windowUpEventController.removeListener();
            dispatchEvent(new Event('mouseup'));
            expect(slideSwipingUp.listener).not.toBeCalled();
        });
    });
});


describe('window touchend event', () => {
    // on touchend slide swiping move listener should be called so we can test attaching listener to window
    // testing if slide swiping move was called
    beforeEach(() => {
        windowUpEventController = new WindowUpEventController(fsLightbox);
        slideSwipingUp.listener = jest.fn();
    });

    describe('attaching touchend event listener to window', () => {
        it('should not call slide swiping move listener', () => {
            dispatchEvent(new Event('touchend'));
            expect(slideSwipingUp.listener).not.toBeCalled();
        });

        it('should call slide swiping move listener', () => {
            windowUpEventController.attachListener();
            dispatchEvent(new Event('touchend'));
            expect(slideSwipingUp.listener).toBeCalled();
        });
    });

    describe('removing touchend event listener from window', () => {
        beforeEach(() => {
            windowUpEventController.attachListener();
        });

        it('should call slide swiping move listener', () => {
            dispatchEvent(new Event('touchend'));
            expect(slideSwipingUp.listener).toBeCalled();
        });

        it('should call slide swiping move listener', () => {
            windowUpEventController.removeListener();
            dispatchEvent(new Event('touchend'));
            expect(slideSwipingUp.listener).not.toBeCalled();
        });
    });
});