import React from 'react';
import FsLightbox from "../../src/FsLightbox";
import { testUrls } from "../schemas/testSchemas";
import { mount } from 'enzyme';
import Toolbar from "../../src/components/nav/Toolbar";


describe('Toolbar', () => {
    it('should close Lightbox', () => {
        const fsLightbox = mount(<FsLightbox isOpen={ true } urls={ testUrls }/>);
        expect(fsLightbox.instance().state.isOpen).toBeTruthy();
        const closeButton = fsLightbox.find('.fslightbox-toolbar-button').at(1);
        closeButton.simulate('click');
        expect(fsLightbox.instance().state.isOpen).toBeFalsy();
    })
});