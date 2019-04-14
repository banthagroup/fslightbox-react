import { FsLightboxMock } from "../../../../../__mocks__/components/fsLightboxMock";
import { WindowMoveEventController } from "../../../../../../src/Core/EventsControllers/Window/Move/WindowMoveEventController";

const fsLightboxMock = new FsLightboxMock();
/** @var { FsLightbox } fsLightbox */
let fsLightbox;
/** @var { SlideSwipingMove } slideSwipingMove */
let slideSwipingMove;
/** @var { WindowMoveEventController } windowMoveEventController */
let windowMoveEventController;

beforeEach(() => {
    fsLightboxMock.instantiateNewFsLightbox();
    fsLightbox = fsLightboxMock.getFsLightbox();
    slideSwipingMove = fsLightbox.core.slideSwiping.move;
});

describe('window mousemove event', () => {
    // on mouse move slide swiping move listener should be called so we can test attaching listener to window
    // testing if slide swiping move was called
    beforeEach(() => {
        windowMoveEventController = new WindowMoveEventController(fsLightbox);
        slideSwipingMove.listener = jest.fn();
    });

    describe('attaching mousemove event listener to window', () => {
        it('should not call slide swiping move listener', () => {
            dispatchEvent(new Event('mousemove'));
            expect(slideSwipingMove.listener).not.toBeCalled();
        });

        it('should call slide swiping move listener', () => {
            windowMoveEventController.attachListener();
            dispatchEvent(new Event('mousemove'));
            expect(slideSwipingMove.listener).toBeCalled();
        });
    });

    describe('removing mousemove event listener from window', () => {
        beforeEach(() => {
            windowMoveEventController.attachListener();
        });

        it('should call slide swiping move listener', () => {
            dispatchEvent(new Event('mousemove'));
            expect(slideSwipingMove.listener).toBeCalled();
        });

        it('should call slide swiping move listener', () => {
            windowMoveEventController.removeListener();
            dispatchEvent(new Event('mousemove'));
            expect(slideSwipingMove.listener).not.toBeCalled();
        });
    });
});


describe('window touchmove event', () => {
    // on touchmove slide swiping move listener should be called so we can test attaching listener to window
    // testing if slide swiping move was called
    beforeEach(() => {
        windowMoveEventController = new WindowMoveEventController(fsLightbox);
        slideSwipingMove.listener = jest.fn();
    });

    describe('attaching touchmove event listener to window', () => {
        it('should not call slide swiping move listener', () => {
            dispatchEvent(new Event('touchmove'));
            expect(slideSwipingMove.listener).not.toBeCalled();
        });

        it('should call slide swiping move listener', () => {
            windowMoveEventController.attachListener();
            dispatchEvent(new Event('touchmove'));
            expect(slideSwipingMove.listener).toBeCalled();
        });
    });

    describe('removing touchmove event listener from window', () => {
        beforeEach(() => {
            windowMoveEventController.attachListener();
        });

        it('should call slide swiping move listener', () => {
            dispatchEvent(new Event('touchmove'));
            expect(slideSwipingMove.listener).toBeCalled();
        });

        it('should call slide swiping move listener', () => {
            windowMoveEventController.removeListener();
            dispatchEvent(new Event('touchmove'));
            expect(slideSwipingMove.listener).not.toBeCalled();
        });
    });
});