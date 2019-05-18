import React from 'react';
import { mount } from "enzyme";
import FsLightbox from "../../src/FsLightbox";
import { CONTAINER_FADE_OUT_TIME } from "../../src/constants/coreConstants";

describe('onInit', () => {
    let fsLightbox;
    let onInit;

    beforeAll(() => {
        onInit = jest.fn();
        fsLightbox = mount(<FsLightbox
            toggler={ false }
            onInit={ onInit }
            urls={ ['images/1.jpg'] }
        />);
        fsLightbox.setProps({
            toggler: true
        })
    });

    it('should call onInit', () => {
        expect(onInit).toBeCalledTimes(1);
    });
});

describe('onOpen - called on every open', () => {
    let fsLightbox;
    let onOpen;

    beforeAll(() => {
        onOpen = jest.fn();
        jest.useFakeTimers();
        fsLightbox = mount(<FsLightbox
            toggler={ false }
            onOpen={ onOpen }
            urls={ ['images/1.jpg'] }
        />);
    });

    it('should call onOpen', () => {
        fsLightbox.setProps({
            toggler: true
        });
        expect(onOpen).toBeCalledTimes(1);
    });

    it('should still call onOpen one time after close', () => {
        fsLightbox.setProps({
            toggler: false
        });
        jest.runTimersToTime(CONTAINER_FADE_OUT_TIME);
        expect(onOpen).toBeCalledTimes(1);
    });

    it('should call onOpen twice after reopening', () => {
        fsLightbox.setProps({
            toggler: true
        });
        expect(onOpen).toBeCalledTimes(2);
    });
});

describe('onClose - called on every close', () => {
    let fsLightbox;
    let onClose;

    beforeAll(() => {
        onClose = jest.fn();
        jest.useFakeTimers();
        fsLightbox = mount(<FsLightbox
            toggler={ false }
            onClose={ onClose }
            urls={ ['images/1.jpg'] }
        />);
    });

    it('should not onClose after open', () => {
        fsLightbox.setProps({
            toggler: true
        });
        expect(onClose).toBeCalledTimes(0);
    });

    it('should call onClose after close', () => {
        fsLightbox.setProps({
            toggler: false
        });
        jest.runTimersToTime(CONTAINER_FADE_OUT_TIME);
        expect(onClose).toBeCalledTimes(1);
    });

    it('should not call onCloseafter reopening', () => {
        fsLightbox.setProps({
            toggler: true
        });
        expect(onClose).toBeCalledTimes(1);
    });
});

describe('onShow - called on every open except init', () => {
    let fsLightbox;
    let onShow;

    beforeAll(() => {
        onShow = jest.fn();
        jest.useFakeTimers();
        fsLightbox = mount(<FsLightbox
            toggler={ false }
            onShow={ onShow }
            urls={ ['images/1.jpg'] }
        />);
    });

    it('should not call onShow after open (first open is initialize)', () => {
        fsLightbox.setProps({
            toggler: true
        });
        expect(onShow).not.toBeCalled();
    });

    it('should not call onShow after close', () => {
        fsLightbox.setProps({
            toggler: false
        });
        jest.runTimersToTime(CONTAINER_FADE_OUT_TIME);
        expect(onShow).not.toBeCalled();
    });

    it('should call onShow after reopen', () => {
        fsLightbox.setProps({
            toggler: true
        });
        expect(onShow).toBeCalledTimes(1);
    });
});