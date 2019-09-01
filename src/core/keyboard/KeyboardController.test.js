import { KeyboardController } from "./KeyboardController";

const fsLightbox = {
    core: {
        lightboxCloser: { closeLightbox: jest.fn() },
        slideChangeFacade: { changeToPrevious: jest.fn(), changeToNext: jest.fn() },
    }
};
const slideChangeFacade = fsLightbox.core.slideChangeFacade;
const keyboardController = new KeyboardController(fsLightbox);

const e = { keyCode: null };
fsLightbox.core.lightboxCloser.closeLightbox = jest.fn();
slideChangeFacade.changeToNext = jest.fn();
slideChangeFacade.changeToPrevious = jest.fn();
keyboardController.listener(e);

test('listener', () => {
    e.keyCode = 'different';
    keyboardController.listener(e);
    expect(fsLightbox.core.lightboxCloser.closeLightbox).not.toBeCalled();
    expect(slideChangeFacade.changeToPrevious).not.toBeCalled();
    expect(slideChangeFacade.changeToNext).not.toBeCalled();

    e.keyCode = 27;
    keyboardController.listener(e);
    expect(fsLightbox.core.lightboxCloser.closeLightbox).toBeCalled();
    expect(slideChangeFacade.changeToPrevious).not.toBeCalled();
    expect(slideChangeFacade.changeToNext).not.toBeCalled();

    e.keyCode = 37;
    keyboardController.listener(e);
    expect(fsLightbox.core.lightboxCloser.closeLightbox).toBeCalledTimes(1);
    expect(slideChangeFacade.changeToPrevious).toBeCalled();
    expect(slideChangeFacade.changeToNext).not.toBeCalled();

    e.keyCode = 39;
    keyboardController.listener(e);
    expect(fsLightbox.core.lightboxCloser.closeLightbox).toBeCalledTimes(1);
    expect(slideChangeFacade.changeToPrevious).toBeCalledTimes(1);
    expect(slideChangeFacade.changeToNext).toBeCalled();
});
