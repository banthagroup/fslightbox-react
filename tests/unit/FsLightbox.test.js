import FsLightbox from "../../src/FsLightbox";
import { testProps, testUrls } from "../schemas/testVariables";
import { createRefsArrayForNumberOfUrls } from "../../src/utils/Arrays/createRefsArrayForNumberOfUrls";
import CloseOpenLightbox from "../../src/core/CloseOpenLightbox";
import { OnResize } from "../../src/core/OnResize";
import React from 'react';
import  SourceSizeAdjusterIterator  from "../../src/core/Source/SourceSizeAdjusterIterator";
import { mount } from "enzyme";
import { createSourceComponentCreatorsArray } from "../../src/utils/Arrays/createSourceComponentCreatorsArray";

describe('FsLightbox', () => {
    const fsLightbox = new FsLightbox(testProps);

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
        expect(fsLightbox.sourceSizeAdjusterIterator).toBeInstanceOf(SourceSizeAdjusterIterator);
        expect(fsLightbox.sourceComponentsCreators).toEqual(createSourceComponentCreatorsArray(fsLightbox));
    });
});


describe('FsLightbox props', () => {
    const fsLightbox = mount(<FsLightbox slide={ 1 } isOpen={ true } urls={ testUrls }/>);
    /**
     * @type {FsLightbox}
     */
    const fsLightboxInstance = fsLightbox.instance();

    it('should update slide property on change slide prop', () => {
        expect(fsLightboxInstance.slide).toEqual(1);
        fsLightbox.setProps({
            slide: 2
        });
        expect(fsLightboxInstance.slide).toEqual(2);
    });
});