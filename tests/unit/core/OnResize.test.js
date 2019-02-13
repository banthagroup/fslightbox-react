import React from 'react';
import { OnResize } from "../../../src/core/OnResize";
import {
    SOURCE_DIMENSIONS_BREAK,
    SOURCE_DIMENSIONS_DECREASE_VALUE
} from "../../../src/constants/ResponsiveConstants";
import { FsLightboxMock } from "../../__mocks__/components/fsLightboxMock";

describe('Resize event', () => {
    const mock = new FsLightboxMock();
    const fsLightbox = mock.getWrapper();
    const fsLightboxInstance = mock.getInstance();
    let onResize;

    beforeEach(() => {
        onResize = new OnResize(fsLightboxInstance);
    });

    it('should inti OnResize', () => {
        onResize.saveMaxSourcesDimensions = jest.fn();
        onResize.adjustMediaHolderSize = jest.fn();
        onResize.attachListener = jest.fn();
        onResize.init();
        expect(onResize.saveMaxSourcesDimensions).toBeCalled();
        expect(onResize.adjustMediaHolderSize).toBeCalled();
        expect(onResize.attachListener).toBeCalled();
    });

    it('should resize source holder', () => {
        global.window.innerWidth = SOURCE_DIMENSIONS_BREAK - 100;
        onResize.init();

        // media holder is full width till SOURCE_DIMENSIONS_BREAK
        expect(fsLightboxInstance.elements.mediaHolder.current.style.width)
            .toEqual(window.innerWidth + 'px');
        expect(fsLightboxInstance.elements.mediaHolder.current.style.height)
            .toEqual(window.innerHeight - (window.innerHeight * SOURCE_DIMENSIONS_DECREASE_VALUE) + 'px');

        global.window.innerWidth = SOURCE_DIMENSIONS_BREAK + 100;
        global.dispatchEvent(new Event('resize'));
        expect(fsLightboxInstance.elements.mediaHolder.current.style.width)
            .toEqual(window.innerWidth - (window.innerWidth * SOURCE_DIMENSIONS_DECREASE_VALUE) + 'px');
        expect(fsLightboxInstance.elements.mediaHolder.current.style.height)
            .toEqual(window.innerHeight - (window.innerHeight * SOURCE_DIMENSIONS_DECREASE_VALUE) + 'px');
    });


    it('should add and remove resize event listner', () => {
        const onResize = new OnResize(fsLightbox.instance());
        onResize.onResizeMethod = jest.fn();
        onResize.init();
        expect(onResize.onResizeMethod).not.toBeCalled();
        global.dispatchEvent(new Event('resize'));
        expect(onResize.onResizeMethod).toBeCalledTimes(1);
        onResize.removeListener();
        global.dispatchEvent(new Event('resize'));
        expect(onResize.onResizeMethod).toBeCalledTimes(1);
    });
});