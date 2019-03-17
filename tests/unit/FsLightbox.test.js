import FsLightbox from "../../src/FsLightbox";
import { testProps, testUrls } from "../schemas/testVariables";
import React from 'react';
import { mount } from "enzyme";

describe('initialize', () => {
    const fsLightbox = new FsLightbox(testProps);
    fsLightbox.core.onResize.init = jest.fn();
    const testStageHolderTransformer = {
        withoutTimeout: jest.fn(),
    };
    fsLightbox.core.sourceHoldersTransformer.transformStageSources = function () {
        return testStageHolderTransformer;
    };
    fsLightbox.initialize();

    it('should init core that need to be initialized', () => {
        expect(fsLightbox.core.onResize.init).toBeCalled();
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
        fsLightboxInstance.core.slideChanger.changeSlideTo = jest.fn();
        expect(fsLightboxInstance.state.slide).toEqual(1);
        fsLightbox.setProps({
            slide: 2
        });
        expect(fsLightboxInstance.core.slideChanger.changeSlideTo).toBeCalled();
    });
});