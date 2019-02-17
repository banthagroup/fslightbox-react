import React from 'react';
import { FsLightboxMock } from "../../__mocks__/components/fsLightboxMock";
import CloseOpenLightbox from "../../../src/core/CloseOpenLightbox";
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
    expect(closeOpenLightbox.documentClassList.contains('fslightbox-open')).toBeFalsy();
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
    expect(closeOpenLightbox.documentClassList.contains('fslightbox-open')).toBeTruthy();
});


it('should call after render open lightbox method', () => {
    closeOpenLightbox.componentMountedAfterOpen = jest.fn();
    closeOpenLightbox._.onResize.attachListener = jest.fn();
    closeOpenLightbox.openLightbox();
    expect(closeOpenLightbox.componentMountedAfterOpen).toHaveBeenCalledTimes(1);
});

test('componentMountedAfterOpen', () => {
    fsLightboxInstance.onResize.attachListener = jest.fn();
    fsLightboxInstance.onResize.adjustMediaHolderSize = jest.fn();
    const mockTransformStageSources = new TransformStageSourcesMock(fsLightboxInstance);
    closeOpenLightbox.componentMountedAfterOpen();
    expect(fsLightboxInstance.onResize.attachListener).toBeCalled();
    expect(fsLightboxInstance.onResize.adjustMediaHolderSize).toBeCalled();
    expect(mockTransformStageSources.withoutTimeout).toBeCalled();
});

it('should call removeListener', () => {
    fsLightboxInstance.onResize.removeListener = jest.fn();
    closeOpenLightbox.componentMountedAfterClose();
    expect(fsLightboxInstance.onResize.removeListener).toBeCalled();
});

