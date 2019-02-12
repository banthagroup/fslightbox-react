import React from 'react';
import { OnResize } from "../../../src/core/OnResize";
import {
    MEDIA_HOLDER_BREAK,
    MEDIA_HOLDER_SIZE_DECREASE_VALUE
} from "../../../src/constants/ResponsiveConstants";
import { FsLightboxMock } from "../../__mocks__/components/fsLightboxMock";

describe('Resize event', () => {
    const mock = new FsLightboxMock();
    const fsLightbox = mock.getWrapper();
    const fsLightboxInstance = mock.getInstance();
    const onResize = new OnResize(fsLightboxInstance);

    it('should resize source holder', () => {
        global.window.innerWidth = MEDIA_HOLDER_BREAK - 100;
        onResize.init();

        // media holder is full width till MEDIA_HOLDER_BREAK
        expect(fsLightboxInstance.elements.mediaHolder.current.style.width)
            .toEqual(window.innerWidth + 'px');
        expect(fsLightboxInstance.elements.mediaHolder.current.style.height)
            .toEqual(window.innerHeight - (window.innerHeight * MEDIA_HOLDER_SIZE_DECREASE_VALUE) + 'px');

        global.window.innerWidth = MEDIA_HOLDER_BREAK + 100;
        global.dispatchEvent(new Event('resize'));
        expect(fsLightboxInstance.elements.mediaHolder.current.style.width)
            .toEqual(window.innerWidth - (window.innerWidth * MEDIA_HOLDER_SIZE_DECREASE_VALUE) + 'px');
        expect(fsLightboxInstance.elements.mediaHolder.current.style.height)
            .toEqual(window.innerHeight - (window.innerHeight * MEDIA_HOLDER_SIZE_DECREASE_VALUE) + 'px');
    });


    it('should add and remove resize event listner', () => {
        const onResize = new OnResize(fsLightbox.instance());
        onResize.onResizeMethod =  jest.fn();
        onResize.init();
        expect(onResize.onResizeMethod).not.toBeCalled();
        global.dispatchEvent(new Event('resize'));
        expect(onResize.onResizeMethod).toBeCalledTimes(1);
        onResize.removeListener();
        global.dispatchEvent(new Event('resize'));
        expect(onResize.onResizeMethod).toBeCalledTimes(1);
    });
});