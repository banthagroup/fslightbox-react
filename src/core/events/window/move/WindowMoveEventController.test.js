import { WindowMoveEventController } from "./WindowMoveEventController";

const fsLightbox = {
    core: {
        slideSwiping: {
            move: {
                listener: () => {}
            }
        }
    }
};
const slideSwipingMove = fsLightbox.core.slideSwiping.move;
const windowMoveEventController = new WindowMoveEventController(fsLightbox);

test('attaching move listeners', () => {
    addEventListener = jest.fn();

    windowMoveEventController.attachListener();

    expect(addEventListener).toBeCalledWith('mousemove', slideSwipingMove.listener);
    expect(addEventListener).toBeCalledWith('touchmove', slideSwipingMove.listener, { passive: true })
});

test('removing move listeners', () => {
    removeEventListener = jest.fn();

    windowMoveEventController.removeListener();

    expect(removeEventListener).toBeCalledWith('mousemove', slideSwipingMove.listener);
    expect(removeEventListener).toBeCalledWith('touchmove', slideSwipingMove.listener)
});
