import { LightboxClosingActions } from "../../../../src/core/main-component/closing/LightboxClosingActions";
import { FSLIGHTBOX_OPEN_CLASS_NAME, LONG_FADE_OUT_CLASS_NAME } from "../../../../src/constants/cssConstants";
import { CONTAINER_FADE_OUT_TIME } from "../../../../src/constants/coreConstants";
import { documentElementClassList } from "../../../../src/helpers/dom/documentElementClassList";

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
    core: {
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
        it('should be called', () => {
            expect(fsLightbox.core.eventsControllers.window.swiping.removeListeners).toBeCalled();
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
    beforeAll(() => {
        jest.useFakeTimers();
        lightboxContainerClassList.add(LONG_FADE_OUT_CLASS_NAME);
        documentElementClassList.add(FSLIGHTBOX_OPEN_CLASS_NAME);
        fsLightbox.setters.setState = jest.fn();
        fsLightbox.core.eventsControllers.window.resize.removeListener = jest.fn();
        recreateLightboxClosingActionsAndCallRunActions();
        lightboxClosingActions.isLightboxFadingOut = true;
        jest.runTimersToTime(CONTAINER_FADE_OUT_TIME);
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

    describe('calling setState with object that contains isOpen property set to false', () => {
        it('should be called with right object', () => {
            expect(fsLightbox.setters.setState).toBeCalledWith({ isOpen: false });
        });
    });

    describe('removing window resize listener', () => {
        it('should call removeResizeListener', () => {
            expect(fsLightbox.core.eventsControllers.window.resize.removeListener).toBeCalled();
        });
    });

    describe('setting isLightboxFading out property to false', () => {
        it('should set isLightboxFading to false', () => {
            expect(lightboxClosingActions.isLightboxFadingOut).toBeFalsy();
        });
    });
});


