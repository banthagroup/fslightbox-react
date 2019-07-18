import { WindowUpEventController } from "./WindowUpEventController";

const fsLightbox = {
    core: {
        slideSwiping: {
            up: {
                listener: () => {}
            }
        }
    }
};

const slideSwipingUp = fsLightbox.core.slideSwiping.up;
const windowUpEventController = new WindowUpEventController(fsLightbox);

test('attachListener', () => {
    addEventListener = jest.fn();

    windowUpEventController.attachListener();

    expect(addEventListener).toBeCalledWith('mouseup', slideSwipingUp.listener);
    expect(addEventListener).toBeCalledWith('touchend', slideSwipingUp.listener, { passive: true });
});

test('removeListener', () => {
    removeEventListener = jest.fn();

    windowUpEventController.removeListener();

    expect(removeEventListener).toBeCalledWith('mouseup', slideSwipingUp.listener);
    expect(removeEventListener).toBeCalledWith('touchend', slideSwipingUp.listener);
});
