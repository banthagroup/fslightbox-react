import { FADE_OUT_STRONG_CLASS_NAME, OPEN_CLASS_NAME } from "../../../constants/classes-names";
import { ANIMATION_TIME } from "../../../constants/css-constants";
import { setUpLightboxCloseActioner } from "./setUpLightboxCloseActioner";

const fsLightbox = {
    componentsServices: { toolbarButtons: { fullscreen: { get: () => false } } },
    core: {
        eventsDispatcher: { dispatch: jest.fn() },
        fullscreenToggler: { exitFullscreen: jest.fn() },
        globalEventsController: { removeListeners: jest.fn() },
        lightboxCloseActioner: {},
        scrollbarRecompensor: { removeRecompense: jest.fn() }
    },
    elements: { container: { current: { classList: { add: jest.fn(), remove: jest.fn() } } } },
    setMainComponentState: () => {},
    slideSwipingProps: {},
};
const lightboxCloseActioner = fsLightbox.core.lightboxCloseActioner;
const isFullscreenOpenState = fsLightbox.componentsServices.toolbarButtons.fullscreen;
const fullscreenToggler = fsLightbox.core.fullscreenToggler;
const scrollbarRecompensor = fsLightbox.core.scrollbarRecompensor;

let setTimeoutParams;
let setMainComponentStateParams;

setUpLightboxCloseActioner(fsLightbox);

test('isLightboxFadingOut', () => {
    expect(lightboxCloseActioner.isLightboxFadingOut).toBe(false);
});

test('before fadeOut (instant actions)', () => {
    lightboxCloseActioner.isLightboxFadingOut = undefined;
    lightboxCloseActioner.runActions();

    expect(lightboxCloseActioner.isLightboxFadingOut).toBe(true);
    expect(fsLightbox.elements.container.current.classList.add).toBeCalledWith(FADE_OUT_STRONG_CLASS_NAME);
    expect(fsLightbox.core.globalEventsController.removeListeners).toBeCalled();

    lightboxCloseActioner.runActions();
    expect(fullscreenToggler.exitFullscreen).not.toBeCalled();

    isFullscreenOpenState.get = () => true;
    lightboxCloseActioner.runActions();
    expect(fullscreenToggler.exitFullscreen).toBeCalled();
});

test('after fade out', () => {
    window.setTimeout = (...params) => { setTimeoutParams = params; };

    lightboxCloseActioner.isLightboxFadingOut = undefined;
    document.documentElement.classList.remove = jest.fn();

    fsLightbox.setMainComponentState = (...params) => { setMainComponentStateParams = params; };

    setUpLightboxCloseActioner(fsLightbox);
    lightboxCloseActioner.runActions();

    expect(setTimeoutParams[1]).toBe(ANIMATION_TIME - 30);

    setTimeoutParams[0]();

    expect(lightboxCloseActioner.isLightboxFadingOut).toBe(false);
    expect(fsLightbox.slideSwipingProps.isSwiping).toBe(false);
    expect(fsLightbox.elements.container.current.classList.remove).toBeCalledWith(FADE_OUT_STRONG_CLASS_NAME);
    expect(document.documentElement.classList.remove).toBeCalledWith(OPEN_CLASS_NAME);
    expect(scrollbarRecompensor.removeRecompense).toBeCalled();

    expect(setMainComponentStateParams[0]).toEqual({ isOpen: false });
    setMainComponentStateParams[1]();
    expect(fsLightbox.core.eventsDispatcher.dispatch).toBeCalledWith('onClose');
});
