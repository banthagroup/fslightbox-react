import React from 'react';
import Source from "../../../../src/components/sources/Source";
import { mount } from "enzyme";
import FsLightbox from "../../../../src";
import { testProps } from "../../../schemas/testVariables";
import { ImageMock } from "../../../__mocks__/components/properSources/ImageMock";

const fsLightbox = new FsLightbox(testProps);
const imageMock = new ImageMock(fsLightbox);
imageMock.createImageMock();
const source = mount(<Source
    _={ fsLightbox }
    i={ 0 }
/>);
/** @type { Source } */
const sourceInstance = source.instance();
fsLightbox.collections.sourceSizeAdjusters[0] = {
    adjustSourceSize: jest.fn()
};

describe('fadeInSource', () => {
    it('should attach fslightbox-fade-in-class', () => {
        fsLightbox.state.slide = 2;
        sourceInstance.onSourceLoad();
        expect(fsLightbox.elements.sources[0].current.classList.contains('fslightbox-fade-in-class'))
            .toBeTruthy();
    });

    it('should not attach fslightbox-fade-in-class due to source is not in stage', () => {
        imageMock.createImageMock();
        fsLightbox.state.slide = 100;
        fsLightbox.totalSlides = 200;
        sourceInstance.onSourceLoad();
        expect(fsLightbox.elements.sources[0].current.classList.contains('fslightbox-fade-in-class'))
            .toBeFalsy();
    });

    it('should attach longer fade in to current on first load for better UX', () => {
        fsLightbox.state.slide = 1;
        sourceInstance.onSourceLoad();
        expect(fsLightbox.elements.sources[0].current.classList.contains('fslightbox-fade-in-complete'))
            .toBeTruthy();
    });
});

test('onSourceLoad', () => {
    sourceInstance.fadeInSource = jest.fn();
    sourceInstance.onSourceLoad();
    expect(fsLightbox.collections.sourceSizeAdjusters[0].adjustSourceSize).toBeCalled();
    expect(sourceInstance.fadeInSource).toBeCalled();
});

