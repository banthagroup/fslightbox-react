import { KeyboardController } from "../../../src/core/keyboard/KeyboardController";
import { ESCAPE, LEFT_ARROW, RIGHT_ARROW } from "../../../src/constants/keyboardConstants";

const fsLightbox = {
    core: {
        stage: {
            getPreviousSlideNumber: () => {},
            getNextSlideNumber: () => {},
        },
        lightboxCloser: {
            closeLightbox: () => {}
        },
        slideChanger: {
            changeSlideTo: () => {}
        }
    }
};

const keyDownEvent = {
    keyCode: null
};
/** @var { KeyboardController } keyboardController */
let keyboardController;

const recreateKeyboardControllerAndCallListener = () => {
    fsLightbox.core.lightboxCloser.closeLightbox = jest.fn();
    fsLightbox.core.slideChanger.changeSlideTo = jest.fn();
    keyboardController = new KeyboardController(fsLightbox);
    keyboardController.keyDownListener(keyDownEvent);
};

describe('keyDownListener', () => {
    describe('escape key', () => {
        beforeAll(() => {
            keyDownEvent.keyCode = ESCAPE;
            recreateKeyboardControllerAndCallListener();
        });

        it('should not call changeSlideTo', () => {
            expect(fsLightbox.core.slideChanger.changeSlideTo).not.toBeCalled();
        });

        it('should call closeLightbox', () => {
            expect(fsLightbox.core.lightboxCloser.closeLightbox).toBeCalled();
        });
    });

    describe('left arrow key', () => {
        beforeAll(() => {
            keyDownEvent.keyCode = LEFT_ARROW;
            fsLightbox.core.stage.getPreviousSlideNumber = () => 1;
            fsLightbox.core.stage.getNextSlideNumber = () => 2;
            recreateKeyboardControllerAndCallListener();
        });

        it('should not call closeLightbox', () => {
            expect(fsLightbox.core.lightboxCloser.closeLightbox).not.toBeCalled();
        });

        it('should call change slide to with previous slide number', () => {
            expect(fsLightbox.core.slideChanger.changeSlideTo).toBeCalledWith(1);
        });
    });

    describe('right arrow key', () => {
        beforeAll(() => {
            keyDownEvent.keyCode = RIGHT_ARROW;
            fsLightbox.core.stage.getPreviousSlideNumber = () => 1;
            fsLightbox.core.stage.getNextSlideNumber = () => 2;
            recreateKeyboardControllerAndCallListener();
        });

        it('should not call closeLightbox', () => {
            expect(fsLightbox.core.lightboxCloser.closeLightbox).not.toBeCalled();
        });

        it('should call change slide to with previous slide number', () => {
            expect(fsLightbox.core.slideChanger.changeSlideTo).toBeCalledWith(2);
        });
    });
});