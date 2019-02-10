import FsLightbox from "../../src/FsLightbox";
import { mount } from "enzyme";
import { testUrls } from "../schemas/testSchemas";
import React from 'react';


describe('Sources Holders', () => {
    const fsLightbox = mount(<FsLightbox isOpen={ true } urls={ testUrls }/>);
    const mediaHolder = fsLightbox.find('.fslightbox-media-holder');

    it('should render number of source holders equivalent to number of urls', () => {
        const sourceHolders = fsLightbox.instance().elements.sourceHolders;
        for (let i = 0; i < sourceHolders.length; i++) {
            expect(sourceHolders[i].current.classList.contains('fslightbox-source-holder'))
                .toBeTruthy();
        }
        expect(mediaHolder.children().length).toEqual(testUrls.length);
    });
});