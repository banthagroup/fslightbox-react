import React from 'react';
import { mount } from "enzyme";
import Source from "../../../../src/components/sources/Source";
import { SourceSizeAdjuster } from "../../../../src/core/Source/SourceSizeAdjuster";
import { ImageMock } from "../../../__mocks__/components/properSources/ImageMock";
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";

describe('Source component methods', () => {
    const mock = new FsLightboxMock();
    const fsLightboxInstance = mock.instantiateFsLightbox().getFsLightbox();

    describe('sourceWasCreated', () => {
        /**
         * @type {Source}
         */
        const sourceInstance = mount(<Source
            _={ fsLightboxInstance }
            i={ 0 }
        />).instance();
        sourceInstance.forceUpdate = jest.fn();
        sourceInstance.sourceWasCreated();

        it('should call forceUpdate', () => {
            expect(sourceInstance.forceUpdate).toBeCalled();
        });
    });


    describe('onSourceLoad', () => {
        const source = mount(<Source
            _={ fsLightboxInstance }
            i={ 0 }
        />);
        /** @type {Source} */
        const sourceInstance = source.instance();
        const imageMock = new ImageMock(fsLightboxInstance);
        imageMock.createImageMock();

        fsLightboxInstance.state.slide = 2;
        fsLightboxInstance.collections.sourceSizeAdjusters[0] = new SourceSizeAdjuster(fsLightboxInstance);
        fsLightboxInstance.collections.sourceSizeAdjusters[0].adjustSourceSize = jest.fn();
        sourceInstance.onSourceLoad();

        it('should call adjustSourceSize', () => {
            expect(fsLightboxInstance.collections.sourceSizeAdjusters[0].adjustSourceSize).toBeCalled();
        });

        it('should add fslightbox-fade-in-class to source because its in stage', () => {
            expect(fsLightboxInstance.elements.sources[0].current.classList.contains('fslightbox-fade-in-class'))
                .toBeTruthy();
        });

        it('should not add fslightbox-fade-in-class to source because its not in stage', () => {
            fsLightboxInstance.state.slide = 5;
            fsLightboxInstance.totalSlides = 10;
            imageMock.createImageMock();
            sourceInstance.onSourceLoad();
            expect(fsLightboxInstance.elements.sources[0].current.classList.contains('fslightbox-fade-in-class'))
                .toBeFalsy();
        });
    });
});