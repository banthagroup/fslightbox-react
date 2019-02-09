import { mount } from "enzyme";
import React from 'react';
import DemoComponentHiddenLightbox from "../../demo/DemoComponentHiddenLightbox";

const demoComponent = mount(<DemoComponentHiddenLightbox/>);

describe('Test FsLightbox component props', () => {
    const buttonTogglingOpen = demoComponent.find('button').at(0);
    const fsLightbox = demoComponent.find('FsLightbox');

    const closeOpenLightbox = fsLightbox.instance().closeOpenLightbox;
    closeOpenLightbox.openLightbox = jest.fn();
    closeOpenLightbox.closeLightbox = jest.fn();

    it('should open lightbox and add class to document element', () => {
        buttonTogglingOpen.simulate('click');
        expect(fsLightbox.instance().props.isOpen).toBeTruthy();
        expect(closeOpenLightbox.openLightbox).toBeCalled();
    });
});