import React from 'react';
import { FsLightboxMock } from "../../__mocks__/components/fsLightboxMock";
import { CloseOpenLightbox } from "../../../src/core/CloseOpenLightbox";
import { TransformStageSourcesMock } from "../../__mocks__/core/TransformStageSourcesMock";


let mock;
let fsLightbox;
let fsLightboxInstance;
let closeOpenLightbox;

beforeEach(() => {
    mock = new FsLightboxMock();
    fsLightbox = mock.getWrapper();
    fsLightboxInstance = mock.getInstance();
    closeOpenLightbox = new CloseOpenLightbox(fsLightboxInstance);
});

it('should remove fslightbox-open class to document on close', () => {
    jest.useFakeTimers();
    closeOpenLightbox.closeLightbox();
    jest.runAllTimers();
    expect(document.documentElement.classList.contains('fslightbox-open')).toBeFalsy();
});

it('should fade-out lightbox on close', () => {
    jest.useFakeTimers();
    closeOpenLightbox.closeLightbox();
    expect(fsLightboxInstance.elements.container.current.classList.contains('fslightbox-fade-out-complete')).toBeTruthy();
    jest.runAllTimers();
    expect(fsLightboxInstance.elements.container.current).toBeNull();
});

it('should add fslightbox-open class to document on open', () => {
    closeOpenLightbox.openLightbox();
    expect(document.documentElement.classList.contains('fslightbox-open')).toBeTruthy();
});

it('should call removeListener', () => {
    fsLightboxInstance.core.onResize.removeListener = jest.fn();
    closeOpenLightbox.afterFadeOut();
    expect(fsLightboxInstance.core.onResize.removeListener).toBeCalled();
});


describe('componentMountedAfterOpen', () => {
    it('should call initialize when opening due to not initialized lightbox', () => {
        fsLightboxInstance.initialize = jest.fn();
        fsLightboxInstance.data.isInitialized = false;
        closeOpenLightbox.openLightbox();
        expect(fsLightboxInstance.initialize).toBeCalled();
    });

    it('should call attachListener', () => {
        fsLightboxInstance.core.onResize.attachListener = jest.fn();
        closeOpenLightbox.openLightbox();
        expect(fsLightboxInstance.core.onResize.attachListener).toBeCalled();
    });

    it('should call adjustMediaHolderSize', () => {
        fsLightboxInstance.core.onResize.adjustMediaHolderSize = jest.fn();
        closeOpenLightbox.openLightbox();
        expect(fsLightboxInstance.core.onResize.adjustMediaHolderSize).toBeCalled();
    });

    it('should call transform stage sources without timeout', () => {
        const transformStageSourcesMock = new TransformStageSourcesMock(fsLightboxInstance);
        closeOpenLightbox.openLightbox();
        expect(transformStageSourcesMock.withoutTimeout).toBeCalled();
    });
});



