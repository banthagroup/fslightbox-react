import React from 'react';
import { OnResize } from "../../../src/core/OnResize";
import { mount } from "enzyme";
import FsLightbox from "../../../src/FsLightbox";
import { testUrls } from "../../schemas/testSchemas";
import {
    MEDIA_HOLDER_BREAK,
    MEDIA_HOLDER_SIZE_DECREASE_VALUE
} from "../../../src/constants/ResponsiveConstants";

describe('Resize event', () => {
    const fsLightbox = mount(<FsLightbox isOpen={ true } urls={ testUrls }/>);
    const instance = fsLightbox.instance();
    const onResize = new OnResize(instance);

    it('should resize source holder', () => {
        global.window.innerWidth = MEDIA_HOLDER_BREAK - 100;
        onResize.init();

        // media holder is full width till MEDIA_HOLDER_BREAK
        expect(instance.elements.mediaHolder.current.style.width)
            .toEqual(window.innerWidth + 'px');
        expect(instance.elements.mediaHolder.current.style.height)
            .toEqual(window.innerHeight - (window.innerHeight * MEDIA_HOLDER_SIZE_DECREASE_VALUE) + 'px');

        global.window.innerWidth = MEDIA_HOLDER_BREAK + 100;
        global.dispatchEvent(new Event('resize'));
        expect(instance.elements.mediaHolder.current.style.width)
            .toEqual(window.innerWidth - (window.innerWidth * MEDIA_HOLDER_SIZE_DECREASE_VALUE) + 'px');
        expect(instance.elements.mediaHolder.current.style.height)
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