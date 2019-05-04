import { LightboxClosingActions } from "../../../../src/core/main-component/closing/LightboxClosingActions";
import { FSLIGHTBOX_OPEN_CLASS_NAME, LONG_FADE_OUT_CLASS_NAME } from "../../../../src/constants/cssConstants";
import { CONTAINER_FADE_OUT_TIME } from "../../../../src/constants/coreConstants";
import { documentElementClassList } from "../../../../src/helpers/dom/document/documentElementClassList";
import { ON_CLOSE } from "../../../../src/constants/eventsConstants";

const lightboxContainerClassList = document.createElement('div').classList;
const fsLightbox = {
    setters: {
        setState: () => {},
    },
    componentsStates: {
        isFullscreenOpen: {
            get: () => false
        }
    },
    elements: {
        container: {
            current: {
                classList: lightboxContainerClassList
            }
        }
    },
    eventsDispatcher: {
        dispatch: () => {}
    },
    core: {
        scrollbarRecompensor: {
            removeRecompense: () => {}
        },
        fullscreenToggler: {
            turnOffFullscreen: () => {}
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
        }
    },
};
/** @var { LightboxClosingActions } lightboxClosingActions */
let lightboxClosingActions;

const recreateLightboxClosingActionsAndCallRunActions = () => {
    lightboxClosingActions = new LightboxClosingActions(fsLightbox);
    lightboxClosingActions.runActions();
};

describe('isLightboxFadingOut property (testing if by default is false)', () => {
    beforeAll(() => {
        lightboxClosingActions = new LightboxClosingActions(fsLightbox)
    });

    it('should be false by default', () => {
        expect(lightboxClosingActions.isLightboxFadingOut).toBeFalsy();
    });
});

describe('before fadeOut (instant actions)', () => {
    beforeAll(() => {
        fsLightbox.core.eventsControllers.window.swiping.removeListeners = jest.fn();
        fsLightbox.core.eventsControllers.document.keyDown.removeListener = jest.fn();
        recreateLightboxClosingActionsAndCallRunActions();
    });

    describe('setting isLightboxFadingOut to true', () => {
        it('should be true', () => {
            expect(lightboxClosingActions.isLightboxFadingOut).toBeTruthy();
        });
    });

    describe('adding long fade out to lightbox container', () => {
        it('should contain long fade out class', () => {
            expect(lightboxContainerClassList.contains(LONG_FADE_OUT_CLASS_NAME)).toBeTruthy();
        });
    });

    describe('removing swiping listeners', () => {
        it('should call removeListeners', () => {
            expect(fsLightbox.core.eventsControllers.window.swiping.removeListeners).toBeCalled();
        });
    });

    describe('removing keyDown listener', () => {
        it('should call removeListener', () => {
            expect(fsLightbox.core.eventsControllers.document.keyDown.removeListener).toBeCalled();
        });
    });

    describe('closing fullscreen', () => {
        beforeEach(() => {
            fsLightbox.core.fullscreenToggler.turnOffFullscreen = jest.fn();
        });

        describe('fullscreen is not open', () => {
            beforeEach(() => {
                fsLightbox.componentsStates.isFullscreenOpen.get = () => false;
                recreateLightboxClosingActionsAndCallRunActions();
            });

            it('should not call turnOffFullscreen', () => {
                expect(fsLightbox.core.fullscreenToggler.turnOffFullscreen).not.toBeCalled();
            });
        });

        describe('fullscreen is open', () => {
            beforeEach(() => {
                fsLightbox.componentsStates.isFullscreenOpen.get = () => true;
                recreateLightboxClosingActionsAndCallRunActions();
            });

            it('should call turnOffFullscreen', () => {
                expect(fsLightbox.core.fullscreenToggler.turnOffFullscreen).toBeCalled();
            });
        });
    });
});

describe('after fade out', () => {
    let state;

    beforeAll(() => {
        jest.useFakeTimers();
        lightboxContainerClassList.add(LONG_FADE_OUT_CLASS_NAME);
        documentElementClassList.add(FSLIGHTBOX_OPEN_CLASS_NAME);
        fsLightbox.core.scrollbarRecompensor.removeRecompense = jest.fn();
        fsLightbox.setters.setState = jest.fn((stateObject, callback) => {
            state = stateObject;
            callback();
        });
        fsLightbox.eventsDispatcher.dispatch = jest.fn();
        fsLightbox.core.eventsControllers.window.resize.removeListener = jest.fn();
        recreateLightboxClosingActionsAndCallRunActions();
        lightboxClosingActions.isLightboxFadingOut = true;
        jest.runTimersToTime(CONTAINER_FADE_OUT_TIME);
    });

    describe('setting isLightboxFading out property to false', () => {
        it('should set isLightboxFading to false', () => {
            expect(lightboxClosingActions.isLightboxFadingOut).toBeFalsy();
        });
    });

    describe('removing long fade out class from lightbox container', () => {
        it('should remove class', () => {
            expect(lightboxContainerClassList.contains(LONG_FADE_OUT_CLASS_NAME)).toBeFalsy();
        });
    });

    describe('removing lightbox open class from document', () => {
        it('should remove class', () => {
            expect(documentElementClassList.contains(FSLIGHTBOX_OPEN_CLASS_NAME)).toBeFalsy();
        });
    });

    describe('removing scrollbar recompense', () => {
        it('should call removeScrollbarRecompense', () => {
            expect(fsLightbox.core.scrollbarRecompensor.removeRecompense).toBeCalled();
        });
    });

    describe('removing window resize listener', () => {
        it('should call removeResizeListener', () => {
            expect(fsLightbox.core.eventsControllers.window.resize.removeListener).toBeCalled();
        });
    });

    describe('setState', () => {
        it('should call set state with object that contains toggler set to false', () => {
            expect(state).toEqual({ isOpen: false });
        });

        it('should dispatch on close event', () => {
            expect(fsLightbox.eventsDispatcher.dispatch).toBeCalledWith(ON_CLOSE);
        });
    });
});


