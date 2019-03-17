import { mount } from "enzyme";
import React from 'react';
import DemoComponentHiddenLightbox from "../../demo/DemoComponentHiddenLightbox";
import FsLightbox from "../../src/FsLightbox";
import { FsLightboxMock } from "../__mocks__/components/fsLightboxMock";

const demoComponent = mount(<DemoComponentHiddenLightbox/>);

describe('Test FsLightbox component props', () => {
    const buttonTogglingOpen = demoComponent.find('button').at(0);
    const fsLightbox = demoComponent.find('FsLightbox');

    const closeOpenLightbox = fsLightbox.instance().core.closeOpenLightbox;
    closeOpenLightbox.openLightbox = jest.fn();
    closeOpenLightbox.closeLightbox = jest.fn();

    it('should open lightbox and add class to document element', () => {
        buttonTogglingOpen.simulate('click');
        expect(fsLightbox.instance().props.isOpen).toBeTruthy();
        expect(closeOpenLightbox.openLightbox).toHaveBeenCalled();
    });

    it('should call lightbox initialize that was closed at start', () => {
        const mock = new FsLightboxMock();
        mock.setOpenToFalse();
        const fsLightboxInstance = mock.getInstance();
        fsLightboxInstance.initialize = jest.fn();
        fsLightboxInstance.core.closeOpenLightbox.openLightbox();
        expect(fsLightboxInstance.initialize).toBeCalled();
    });
});