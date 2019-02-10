import FsLightbox from "../../src/FsLightbox";
import { testMainComponentProps, testUrls } from "../schemas/testSchemas";
import { createRefsArrayForNumberOfUrls } from "../../src/utils/createRefsArrayForNumberOfUrls";
import { CloseOpenLightbox } from "../../src/utils/mainComponentScope/CloseOpenLightbox";
import { OnResize } from "../../src/core/OnResize";
import React from 'react';

describe('FsLightbox', () => {
    const fsLightbox = new FsLightbox(testMainComponentProps);

    it('should set data', () => {
        expect(fsLightbox.slide).toEqual(1);
        expect(fsLightbox.totalSlides).toEqual(testUrls.length);
        expect(fsLightbox.initialized).toBeFalsy()
    });

    it('should set states', () => {
        expect(fsLightbox.state.isOpen).toBeTruthy();
        expect(fsLightbox.state.slide).toEqual(1);
    });

    it('should set elements', () => {
        expect(fsLightbox.elements.container).toEqual(React.createRef());
        expect(fsLightbox.elements.mediaHolder).toEqual(React.createRef());
        expect(fsLightbox.elements.sourceHolders).toEqual(createRefsArrayForNumberOfUrls(testUrls));
        expect(fsLightbox.elements.sources).toEqual(createRefsArrayForNumberOfUrls(testUrls));
    });

    it('should set core', () => {
        expect(fsLightbox.closeOpenLightbox).toBeInstanceOf(CloseOpenLightbox);
        expect(fsLightbox.onResize).toBeInstanceOf(OnResize);
    });
});