import { CloseOpenLightbox } from "../../src/utils/mainComponentScope/CloseOpenLightbox";
import { testUrls } from "../schemas/testSchemas";
import { mount } from "enzyme";
import React from 'react';
import FsLightbox from "../../src/FsLightbox";


describe('Util functions that in constructor takes scope of main component', () => {
    describe('CloseOpenLightbox', () => {
        let fsLightbox;
        let instance;
        let closeOpenLightbox;

        beforeEach(() => {
            fsLightbox = mount(<FsLightbox isOpen={ true } urls={ testUrls }/>);
            instance = fsLightbox.instance();
            closeOpenLightbox = new CloseOpenLightbox(instance);
        });

        it('should add remove class from document on close open lightbox', () => {
            closeOpenLightbox.closeLightbox();
            expect(closeOpenLightbox.documentClassList.contains('fslightbox-open')).toBeFalsy();
            closeOpenLightbox.openLightbox();
            expect(closeOpenLightbox.documentClassList.contains('fslightbox-open')).toBeTruthy();
        });

        it('should call after render open lightbox method', () => {
            closeOpenLightbox.componentMountedAfterOpen = jest.fn();
            closeOpenLightbox.fsLightbox.onResize.attachListener = jest.fn();
            closeOpenLightbox.openLightbox();
            expect(closeOpenLightbox.componentMountedAfterOpen).toHaveBeenCalledTimes(1);
        });

        it('should attach listener, call scaleMediaHolder', () => {
            instance.onResize.attachListener = jest.fn();
            instance.onResize.scaleMediaHolder = jest.fn();
            closeOpenLightbox.componentMountedAfterOpen();
            expect(instance.onResize.attachListener).toBeCalled();
            expect(instance.onResize.scaleMediaHolder).toBeCalled();
        });

    });
});