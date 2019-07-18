import { ESCAPE, LEFT_ARROW, RIGHT_ARROW } from "../../constants/keyboard-constants";
import { setUpKeyboardController } from "./setUpKeyboardController";

const keyboardController = {};
const fsLightbox = {
    core: {
        lightboxCloser: {
            closeLightbox: () => {}
        },
        slideChangeFacade: {
            changeToPrevious: () => {},
            changeToNext: () => {}
        },
        keyboardController: keyboardController
    }
};
const slideChangeFacade = fsLightbox.core.slideChangeFacade;
setUpKeyboardController(fsLightbox);

const keyDownEvent = {
    keyCode: null
};

const setUpMockFunctionsAndCallHandleKeyDown = () => {
    fsLightbox.core.lightboxCloser.closeLightbox = jest.fn();
    slideChangeFacade.changeToNext = jest.fn();
    slideChangeFacade.changeToPrevious = jest.fn();
    keyboardController.handleKeyDown(keyDownEvent);
};

test('escape key', () => {
    keyDownEvent.keyCode = ESCAPE;
    setUpMockFunctionsAndCallHandleKeyDown();

    expect(slideChangeFacade.changeToPrevious).not.toBeCalled();
    expect(slideChangeFacade.changeToNext).not.toBeCalled();
    expect(fsLightbox.core.lightboxCloser.closeLightbox).toBeCalled();
});

test('left arrow key', () => {
    keyDownEvent.keyCode = LEFT_ARROW;
    setUpMockFunctionsAndCallHandleKeyDown();

    expect(fsLightbox.core.lightboxCloser.closeLightbox).not.toBeCalled();
    expect(slideChangeFacade.changeToPrevious).toBeCalled();
    expect(slideChangeFacade.changeToNext).not.toBeCalled();
});

test('right arrow key', () => {
    keyDownEvent.keyCode = RIGHT_ARROW;
    setUpMockFunctionsAndCallHandleKeyDown();

    expect(fsLightbox.core.lightboxCloser.closeLightbox).not.toBeCalled();
    expect(slideChangeFacade.changeToPrevious).not.toBeCalled();
    expect(slideChangeFacade.changeToNext).toBeCalled();
});
