import React from 'react';
import { FsLightboxEnzymeMock } from "../../__mocks__/components/fsLightboxEnzymeMock";
import { CloseOpenLightbox } from "../../../src/core/CloseOpenLightbox";
import { FsLightboxMock } from "../../__mocks__/components/fsLightboxMock";
import { TransformStageSourcesMock } from "../../__mocks__/core/TransformStageSourcesMock";


describe('closing lightbox', () => {
    const mock = new FsLightboxEnzymeMock();
    const fsLightboxInstance = mock.getInstance();
    const closeOpenLightbox = new CloseOpenLightbox(fsLightboxInstance);

    it('should fade-out lightbox on close and remove fslightbox-open class from document', () => {
        jest.useFakeTimers();
        closeOpenLightbox.closeLightbox();
        expect(fsLightboxInstance.elements.container.current.classList.contains('fslightbox-fade-out-complete')).toBeTruthy();
        jest.runAllTimers();
        expect(fsLightboxInstance.elements.container.current).toBeNull();
        expect(document.documentElement.classList.contains('fslightbox-open')).toBeFalsy();
    });

    it('should add fslightbox-open class to document on open', () => {
        closeOpenLightbox.openLightbox();
        expect(document.documentElement.classList.contains('fslightbox-open')).toBeTruthy();
    });

    it('should call removeListener after lightbox fade out', () => {
        jest.useFakeTimers();
        fsLightboxInstance.core.onResize.removeListener = jest.fn();
        closeOpenLightbox.closeLightbox();
        jest.runAllTimers();
        expect(fsLightboxInstance.core.onResize.removeListener).toBeCalled();
    });
});

describe('Fullscreen', () => {
    let fsLightboxMock;
    let fsLightbox;

    // setting up instance before each test because we are closing lightbox in tests so need to reset lightbox because
    // we cannot for e.g. close lightbox twice
    beforeEach(() => {
        fsLightboxMock = new FsLightboxMock();
        fsLightbox = fsLightboxMock.instantiateFsLightbox().getFsLightbox();
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
    const fsLightbox = fsLightboxMock.instantiateFsLightbox().getFsLightbox();
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
    fsLightboxMock.instantiateFsLightbox();
    fsLightboxMock.setAllSourceHoldersToDivs();
    const fsLightbox = fsLightboxMock.getFsLightbox();
    const closeOpenLightbox = fsLightbox.core.closeOpenLightbox;
    fsLightbox.data.isInitialized = true;
    fsLightbox.core.onResize.attachListener = jest.fn();
    fsLightbox.core.onResize.adjustMediaHolderSize = jest.fn();

    it('should call attachListener', () => {
        closeOpenLightbox.openLightbox();
        expect(fsLightbox.core.onResize.attachListener).toBeCalled();
    });

    it('should call adjustMediaHolderSize', () => {
        closeOpenLightbox.openLightbox();
        expect(fsLightbox.core.onResize.adjustMediaHolderSize).toBeCalled();
    });

    it('should call transform stage sources without timeout', () => {
        const transformStagesSoruceMock = new TransformStageSourcesMock(fsLightbox);
        closeOpenLightbox.openLightbox();
        expect(transformStagesSoruceMock.withoutTimeout).toBeCalled();
    });
});



