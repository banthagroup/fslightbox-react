import FsLightbox from "../../src/FsLightbox";
import { testProps, testUrls } from "../schemas/testVariables";
import { createRefsArrayForNumberOfUrls } from "../../src/utils/Arrays/createRefsArrayForNumberOfUrls";
import CloseOpenLightbox from "../../src/core/CloseOpenLightbox";
import { OnResize } from "../../src/core/OnResize";
import React from 'react';
import SourceSizeAdjusterIterator from "../../src/core/Source/SourceSizeAdjusterIterator";
import { mount } from "enzyme";
import { createNullArrayForNumberOfUrls } from "../../src/utils/Arrays/createNullArrayForNumberOfUrls";
import { SourceHoldersTransformer } from "../../src/core/Transforms/SourceHoldersTransformer";
import { StageSources } from "../../src/core/Stage/StageSources";
import { SlideChanger } from "../../src/core/Slide/SlideChanger";
import { SourceAnimator } from "../../src/core/Animations/SourceAnimator";

describe('FsLightbox', () => {
    const fsLightbox = new FsLightbox(testProps);

    it('should set data', () => {
        expect(fsLightbox.slide).toEqual(1);
        expect(fsLightbox.totalSlides).toEqual(testUrls.length);
        expect(fsLightbox.initialized).toBeFalsy()
        expect(fsLightbox.isMobile).toBeFalsy();
    });

    it('should set states', () => {
        expect(fsLightbox.state.isOpen).toBeTruthy();
    });

    it('should set elements', () => {
        expect(fsLightbox.elements.container).toEqual(React.createRef());
        expect(fsLightbox.elements.mediaHolder).toEqual(React.createRef());
        expect(fsLightbox.elements.sourceHolders).toEqual(createRefsArrayForNumberOfUrls(testUrls));
        expect(fsLightbox.elements.sourcesJSXComponents).toEqual(createNullArrayForNumberOfUrls(testUrls));
        expect(fsLightbox.elements.sources).toEqual(createRefsArrayForNumberOfUrls(testUrls));
    });

    it('should set core', () => {
        expect(fsLightbox.closeOpenLightbox).toBeInstanceOf(CloseOpenLightbox);
        expect(fsLightbox.onResize).toBeInstanceOf(OnResize);
        expect(fsLightbox.sourceSizeAdjusterIterator).toBeInstanceOf(SourceSizeAdjusterIterator);
        expect(fsLightbox.sourceHoldersTransformer).toBeInstanceOf(SourceHoldersTransformer);
        expect(fsLightbox.stageSources).toBeInstanceOf(StageSources);
        expect(fsLightbox.slideChanger).toBeInstanceOf(SlideChanger);
        expect(fsLightbox.sourceAnimator).toBeInstanceOf(SourceAnimator);
    });
});


describe('initialize', () => {
    const fsLightbox = new FsLightbox(testProps);
    fsLightbox.onResize.init = jest.fn();
    const testStageHolderTransformer = {
        withoutTimeout: jest.fn(),
    };
    fsLightbox.sourceHoldersTransformer.transformStageSources = function () {
        return testStageHolderTransformer;
    };
    fsLightbox.initialize();

    it('should init core that need to be initialized', () => {
        expect(fsLightbox.onResize.init).toBeCalled();
        expect(testStageHolderTransformer.withoutTimeout).toBeCalled();
    });
});


describe('FsLightbox props', () => {
    const fsLightbox = mount(<FsLightbox slide={ 1 } isOpen={ true } urls={ testUrls }/>);
    /**
     * @type {FsLightbox}
     */
    const fsLightboxInstance = fsLightbox.instance();

    it('should call changeSlide on changeSlideProp', () => {
        fsLightboxInstance.slideChanger.changeSlide = jest.fn();
        expect(fsLightboxInstance.slide).toEqual(1);
        fsLightbox.setProps({
            slide: 2
        });
        expect(fsLightboxInstance.slideChanger.changeSlide).toBeCalled();
    });
});