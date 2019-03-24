import React from 'react';
import { CloseOpenLightbox } from "../../../src/core/CloseOpenLightbox";
import { FsLightboxMock } from "../../__mocks__/components/fsLightboxMock";
import { TransformStageSourcesMock } from "../../__mocks__/core/TransformStageSourcesMock";
import { FADE_OUT_COMPLETE_CLASS_NAME } from "../../../src/constants/CssConstants";

describe('closing lightbox', () => {
    const fsLightboxMock = new FsLightboxMock();
    /** @var { FsLightbox } fsLightbox */
    let fsLightbox;
    /** @var { Element } fsLightboxContainer */
    let fsLightboxContainer;

    beforeEach(() => {
        fsLightboxMock.instantiateNewFsLightbox();
        fsLightbox = fsLightboxMock.getFsLightbox();
        // in closing lightbox we are using fslightbox-container so we need to mock it
        fsLightboxContainer = document.createElement('div');
        fsLightbox.elements.container.current = fsLightboxContainer;
    });

    describe('before fadeOut', () => {
        beforeEach(() => {
            fsLightbox.core.eventsControllers.window.swiping.removeListeners = jest.fn();
            fsLightbox.core.closeOpenLightbox.closeLightbox();
        });

        it('should add complete fade out class to fslightbox container', () => {
            expect(fsLightboxContainer.classList.contains(FADE_OUT_COMPLETE_CLASS_NAME)).toBeTruthy();
        });

        it('should remove window swiping events', () => {
            expect(fsLightbox.core.eventsControllers.window.swiping.removeListeners).toBeCalled();
        });
    });


    describe('after fadeout', () => {
        beforeEach(() => {
            // mocking transforming stage sources because we don't have source holders loaded
            // and in opening lightbox we are transforming them
            fsLightboxMock.setAllSourceHoldersToDivs();
            // mocking media holder for the same reason as source holders
            fsLightbox.elements.mediaHolder.current = document.createElement('div');

            fsLightbox.core.eventsControllers.window.resize.removeListener = jest.fn();
            // opening lightbox that we will close
            fsLightbox.core.closeOpenLightbox.openLightbox();
            jest.useFakeTimers();
            fsLightbox.core.closeOpenLightbox.closeLightbox();
            jest.runAllTimers();
        });

        it('should remove complete fade out class from fslightbox container', () => {
            expect(fsLightboxContainer.classList.contains(FADE_OUT_COMPLETE_CLASS_NAME)).toBeFalsy();
        });

        it('should should remove window resize event listener', () => {
            expect(fsLightbox.core.eventsControllers.window.resize.removeListener).toBeCalled();
        });

        it('should set isOpen state to false', () => {
            expect(fsLightbox.state.isOpen).toBeFalsy();
        });
    });
});

describe('Fullscreen', () => {
    let fsLightboxMock;
    let fsLightbox;

    // setting up instance before each test because we are closing lightbox in tests so need to reset lightbox because
    // we cannot for e.g. close lightbox twice
    beforeEach(() => {
        fsLightboxMock = new FsLightboxMock();
        fsLightbox = fsLightboxMock.getFsLightbox();
        fsLightbox.elements.container.current = document.createElement('div');
    });

    it('should not close fullscreen due to fullscreen not open', () => {
        fsLightbox.core.fullscreenToggler.turnOffFullscreen = jest.fn();
        fsLightbox.data.isFullscreenOpen = false;
        fsLightbox.core.closeOpenLightbox.closeLightbox();
        expect(fsLightbox.core.fullscreenToggler.turnOffFullscreen).not.toBeCalled();
    });

    it('should close fullscreen because fullscreen is open', () => {
        fsLightbox.core.fullscreenToggler.turnOffFullscreen = jest.fn();
        fsLightbox.data.isFullscreenOpen = true;
        fsLightbox.core.closeOpenLightbox.closeLightbox();
        expect(fsLightbox.core.fullscreenToggler.turnOffFullscreen).toBeCalled();
    });
});


describe('componentMountedAfterOpen and component not initialized', () => {
    const fsLightboxMock = new FsLightboxMock();
    const fsLightbox = fsLightboxMock.getFsLightbox();
    const closeOpenLightbox = new CloseOpenLightbox(fsLightbox);

    it('should call initialize when opening due to not initialized lightbox', () => {
        fsLightbox.initialize = jest.fn();
        fsLightbox.data.isInitialized = false;
        closeOpenLightbox.openLightbox();
        expect(fsLightbox.initialize).toBeCalled();
    });
});


describe('componentMountedAfterOpen and component is initialized', () => {
    const fsLightboxMock = new FsLightboxMock();
    fsLightboxMock.instantiateNewFsLightbox();
    fsLightboxMock.setAllSourceHoldersToDivs();
    const fsLightbox = fsLightboxMock.getFsLightbox();
    const closeOpenLightbox = fsLightbox.core.closeOpenLightbox;
    fsLightbox.data.isInitialized = true;
    fsLightbox.core.eventsControllers.window.resize.attachListener = jest.fn();
    fsLightbox.core.eventsControllers.window.swiping.attachListeners = jest.fn();
    fsLightbox.core.sizeController.adjustMediaHolderSize = jest.fn();

    it('should attach window resize listener', () => {
        closeOpenLightbox.openLightbox();
        expect(fsLightbox.core.eventsControllers.window.resize.attachListener).toBeCalled();
    });

    it('should attach window swiping listeners', () => {
        closeOpenLightbox.openLightbox();
        expect(fsLightbox.core.eventsControllers.window.swiping.attachListeners).toBeCalled();
    })

    it('should call adjustMediaHolderSize', () => {
        closeOpenLightbox.openLightbox();
        expect(fsLightbox.core.sizeController.adjustMediaHolderSize).toBeCalled();
    });

    it('should call transform stage Sources without timeout', () => {
        const transformStagesSoruceMock = new TransformStageSourcesMock(fsLightbox);
        closeOpenLightbox.openLightbox();
        expect(transformStagesSoruceMock.withoutTimeout).toBeCalled();
    });
});



