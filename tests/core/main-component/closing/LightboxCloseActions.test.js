import { LightboxCloseActions } from "../../../../src/core/main-component/closing/LightboxCloseActions";
import { ON_CLOSE } from "../../../../src/constants/eventsConstants";
import { LONG_FADE_OUT_CLASS_NAME, OPEN_CLASS_NAME } from "../../../../src/constants/classes-names";
import { ANIMATION_TIME } from "../../../../src/constants/css-constants";
import { LIGHTBOX_CONTAINER } from "../../../../src/constants/elements";

const fsLightbox = {
    componentsStates: {
        isFullscreenOpen: {
            get: () => false
        }
    },
    core: {
        classListManager: {
            manageElement: () => ({
                add: () => {},
                remove: () => {}
            })
        },
        eventsControllers: {
            window: {
                resize: {
                    removeListener: () => {},
                },
                swiping: {
                    removeListeners: () => {},
                }
            },
            document: {
                keyDown: {
                    removeListener: () => {}
                }
            }
        },
        eventsDispatcher: {
            dispatch: () => {}
        },
        fullscreenToggler: {
            turnOffFullscreen: () => {}
        },
        scrollbarRecompensor: {
            removeRecompense: () => {}
        }
    },
    setMainComponentState: () => {}
};

const isFullscreenOpenState = fsLightbox.componentsStates.isFullscreenOpen;
const classListManager = fsLightbox.core.classListManager;
const windowResizeEventController = fsLightbox.core.eventsControllers.window.resize;
const swipingEventsControllerFacade = fsLightbox.core.eventsControllers.window.swiping;
const keyDownEventController = fsLightbox.core.eventsControllers.document.keyDown;
const eventsDispatcher = fsLightbox.core.eventsDispatcher;
const fullscreenToggler = fsLightbox.core.fullscreenToggler;
const scrollbarRecompensor = fsLightbox.core.scrollbarRecompensor;

let lightboxClosingActions = new LightboxCloseActions(fsLightbox);

describe('isLightboxFadingOut property (testing if by default is false)', () => {
    it('should be false by default', () => {
        expect(lightboxClosingActions.isLightboxFadingOut).toBe(false);
    });
});

describe('before fadeOut (instant actions)', () => {
    let addClass;

    beforeAll(() => {
        lightboxClosingActions.isLightboxFadingOut = undefined;
        addClass = jest.fn();
        classListManager.manageElement = (elementName) => {
            if (elementName === LIGHTBOX_CONTAINER) {
                return {
                    add: addClass
                }
            }
        };
        swipingEventsControllerFacade.removeListeners = jest.fn();
        keyDownEventController.removeListener = jest.fn();
        lightboxClosingActions.runActions();
    });

    it('should correctly call non conditional actions', () => {
        expect(lightboxClosingActions.isLightboxFadingOut).toBe(true);
        expect(addClass).toBeCalledWith(LONG_FADE_OUT_CLASS_NAME);
        expect(swipingEventsControllerFacade.removeListeners).toBeCalled();
        expect(keyDownEventController.removeListener).toBeCalled();
    });

    it('should close fullscreen if is open', () => {
        fullscreenToggler.turnOffFullscreen = jest.fn();

        isFullscreenOpenState.get = () => false;
        lightboxClosingActions.runActions();
        expect(fullscreenToggler.turnOffFullscreen).not.toBeCalled();

        isFullscreenOpenState.get = () => true;
        lightboxClosingActions.runActions();
        expect(fullscreenToggler.turnOffFullscreen).toBeCalled();
    });
});

describe('after fade out', () => {
    let setMainComponentStateParams;
    let setTimeoutParams;
    let removeClass;

    beforeAll(() => {
        window.setTimeout = (...params) => {
            setTimeoutParams = params;
        };

        lightboxClosingActions.isLightboxFadingOut = undefined;
        removeClass = jest.fn();
        classListManager.manageElement = (elementName) => {
            if (elementName === LIGHTBOX_CONTAINER) {
                return {
                    add: () => {},
                    remove: removeClass
                }
            }
        };
        document.documentElement.classList.remove = jest.fn();
        scrollbarRecompensor.removeRecompense = jest.fn();
        windowResizeEventController.removeListener = jest.fn();
        fsLightbox.setMainComponentState = (...params) => {
            setMainComponentStateParams = params;
        };
        eventsDispatcher.dispatch = jest.fn();

        lightboxClosingActions = new LightboxCloseActions(fsLightbox);
        lightboxClosingActions.runActions();
    });

    it('should call setTimeout with animation time', () => {
        expect(setTimeoutParams[1]).toBe(ANIMATION_TIME);
    });

    describe('callback', () => {
        beforeAll(() => {
            setTimeoutParams[0]();
        });

        it('should correctly run actions', () => {
            expect(removeClass).toBeCalledWith(LONG_FADE_OUT_CLASS_NAME);
            expect(document.documentElement.classList.remove).toBeCalledWith(OPEN_CLASS_NAME);
            expect(scrollbarRecompensor.removeRecompense).toBeCalled();
            expect(windowResizeEventController.removeListener).toBeCalled();

            // setting main component isOpen state
            expect(setMainComponentStateParams[0]).toEqual({
                isOpen: false
            });
            // ste state callback
            setMainComponentStateParams[1]();
            expect(eventsDispatcher.dispatch).toBeCalledWith(ON_CLOSE);
        });
    });
});


