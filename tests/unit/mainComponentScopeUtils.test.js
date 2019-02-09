import { CloseOpenLightbox } from "../../src/utils/mainComponentScope/CloseOpenLightbox";
import { testUrls } from "../schemas/testSchemas";
import { mount } from "enzyme";
import React from 'react';
import FsLightbox from "../../src/FsLightbox";


describe('Util functions that in constructor takes scope of main component', () => {
    const fsLightbox = mount(<FsLightbox isOpen={ true } urls={ testUrls }/>);

    it('should add class to document', () => {
        const closeOpenLightbox = new CloseOpenLightbox(fsLightbox.instance());
        closeOpenLightbox.closeLightbox();
        expect(closeOpenLightbox.documentClassList.contains('fslightbox-open')).toBeFalsy();
        closeOpenLightbox.openLightbox();
        expect(closeOpenLightbox.documentClassList.contains('fslightbox-open')).toBeTruthy();
    });
});