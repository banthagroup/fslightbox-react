import { WindowUpEventController } from "../../../../../src/core/events/window/up/WindowUpEventController";

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

describe('attachListener', () => {
    beforeAll(() => {
        addEventListener = jest.fn();
        windowUpEventController.attachListener();
    });

    it('should add mouseup event listener', () => {
        expect(addEventListener).toBeCalledWith('mouseup', slideSwipingUp.listener);
    });

    it('should add touchend event listener', () => {
        expect(addEventListener).toBeCalledWith('touchend', slideSwipingUp.listener, { passive: true });
    });
});

describe('removeListener', () => {
    beforeAll(() => {
        removeEventListener = jest.fn();
        windowUpEventController.removeListener();
    });

    it('should remove mouseup event listener', () => {
        expect(removeEventListener).toBeCalledWith('mouseup', slideSwipingUp.listener);
    });

    it('should remove touchend event listener', () => {
        expect(removeEventListener).toBeCalledWith('touchend', slideSwipingUp.listener);
    });
});
