import { ESCAPE, LEFT_ARROW, RIGHT_ARROW } from "../../../src/constants/keyboardConstants";
import { setUpKeyboardController } from "../../../src/core/keyboard/setUpKeyboardController";

const fsLightbox = {
    core: {
        keyboardController: {},
        lightboxCloser: {
            closeLightbox: () => {}
        },
        slideChangeFacade: {
            changeToNext: () => {},
            changeToPrevious: () => {}
        }
    }
};
const keyboardController = fsLightbox.core.keyboardController;
const lightboxCloser = fsLightbox.core.lightboxCloser;
const slideChangeFacade = fsLightbox.core.slideChangeFacade;

setUpKeyboardController(fsLightbox);

const keyDownEvent = {
    keyCode: null
};

const setUpMockFunctionsAndCallHandleKeyDown = () => {
    lightboxCloser.closeLightbox = jest.fn();
    slideChangeFacade.changeToPrevious = jest.fn();
    slideChangeFacade.changeToNext = jest.fn();
    keyboardController.handleKeyDown(keyDownEvent);
};

describe('keyDownListener', () => {
    describe('escape key', () => {
        beforeAll(() => {
            keyDownEvent.keyCode = ESCAPE;
            setUpMockFunctionsAndCallHandleKeyDown();
        });

        it('should call proper method', () => {
            expect(slideChangeFacade.changeToPrevious).not.toBeCalled();
            expect(slideChangeFacade.changeToNext).not.toBeCalled();
            expect(lightboxCloser.closeLightbox).toBeCalled();
        });
    });

    describe('left arrow key', () => {
        beforeAll(() => {
            keyDownEvent.keyCode = LEFT_ARROW;
            setUpMockFunctionsAndCallHandleKeyDown();
        });

        it('should call proper method', () => {
            expect(slideChangeFacade.changeToPrevious).toBeCalled();
            expect(slideChangeFacade.changeToNext).not.toBeCalled();
            expect(lightboxCloser.closeLightbox).not.toBeCalled();
        });
    });

    describe('right arrow key', () => {
        beforeAll(() => {
            keyDownEvent.keyCode = RIGHT_ARROW;
            setUpMockFunctionsAndCallHandleKeyDown();
        });

        it('should call proper method', () => {
            expect(slideChangeFacade.changeToPrevious).not.toBeCalled();
            expect(slideChangeFacade.changeToNext).toBeCalled();
            expect(lightboxCloser.closeLightbox).not.toBeCalled();
        });
    });
});
