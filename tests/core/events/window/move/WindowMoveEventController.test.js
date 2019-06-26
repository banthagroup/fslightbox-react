import { WindowMoveEventController } from "../../../../../src/core/events/window/move/WindowMoveEventController";

const fsLightbox = {
    core: {
        slideSwiping: {
            move: {
                listener: () => {}
            }
        }
    }
};
/** @var { WindowMoveEventController } windowMoveEventController */
let windowMoveEventController;

beforeEach(() => {
    fsLightbox.core.slideSwiping.move.listener = jest.fn();
    windowMoveEventController = new WindowMoveEventController(fsLightbox);
});

describe('window mousemove event', () => {
    describe('attaching mousemove event listener to window', () => {
        it('should not call slide swiping move listener', () => {
            dispatchEvent(new Event('mousemove'));
            expect(fsLightbox.core.slideSwiping.move.listener).not.toBeCalled();
        });

        it('should call slide swiping move listener', () => {
            windowMoveEventController.attachListener();
            dispatchEvent(new Event('mousemove'));
            expect(fsLightbox.core.slideSwiping.move.listener).toBeCalled();
        });
    });

    describe('removing mousemove event listener from window', () => {
        beforeEach(() => {
            windowMoveEventController.attachListener();
        });

        it('should call slide swiping move listener', () => {
            dispatchEvent(new Event('mousemove'));
            expect(fsLightbox.core.slideSwiping.move.listener).toBeCalled();
        });

        it('should call slide swiping move listener', () => {
            windowMoveEventController.removeListener();
            dispatchEvent(new Event('mousemove'));
            expect(fsLightbox.core.slideSwiping.move.listener).not.toBeCalled();
        });
    });
});


describe('window touchmove event', () => {
    describe('attaching touchmove event listener to window', () => {
        it('should not call slide swiping move listener', () => {
            dispatchEvent(new Event('touchmove'));
            expect(fsLightbox.core.slideSwiping.move.listener).not.toBeCalled();
        });

        it('should call slide swiping move listener', () => {
            windowMoveEventController.attachListener();
            dispatchEvent(new Event('touchmove'));
            expect(fsLightbox.core.slideSwiping.move.listener).toBeCalled();
        });
    });

    describe('removing touchmove event listener from window', () => {
        beforeEach(() => {
            windowMoveEventController.attachListener();
        });

        it('should call slide swiping move listener', () => {
            dispatchEvent(new Event('touchmove'));
            expect(fsLightbox.core.slideSwiping.move.listener).toBeCalled();
        });

        it('should call slide swiping move listener', () => {
            windowMoveEventController.removeListener();
            dispatchEvent(new Event('touchmove'));
            expect(fsLightbox.core.slideSwiping.move.listener).not.toBeCalled();
        });
    });
});
