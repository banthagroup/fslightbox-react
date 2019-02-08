import { CloseOpenLightbox } from "../../src/utils/mainComponentScope/CloseOpenLightbox";
import FsLightbox from "../../src";
import { testUrls } from "../schemas/testSchemas";
import { mount } from "enzyme";
import React from 'react';


describe('Util functions that in constructor takes scope of main component', () => {
    const fsLightbox = mount(<FsLightbox isOpen={ false } urls={ testUrls }/>);

    it('should add class to document', () => {
        const closeOpenLightbox = new CloseOpenLightbox(fsLightbox.instance());
        closeOpenLightbox.openLightbox();
        expect(closeOpenLightbox.documentClassList.contains('fslightbox-open')).toBeTruthy();
        closeOpenLightbox.closeLightbox();
        expect(closeOpenLightbox.documentClassList.contains('fslightbox-open')).toBeFalsy();
    });
});