import React from 'react';
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { mount } from "enzyme";
import Source from "../../../../src/components/sources/Source";
import { SourceTransformer } from "../../../../src/core/Transforms/SourceTransformer";
import { ImageMock } from "../../../__mocks__/components/imageMock";

describe('Source component methods', () => {
    const mock = new FsLightboxMock();
    const fsLightboxInstance = mock.getInstance();

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

        it('should create sourceTransformer', () => {
            expect(fsLightboxInstance.sourceTransformers[0])
                .toBeInstanceOf(SourceTransformer);
        });
    });


    describe('onSourceLoad', () => {
        /**
         * @type {Source}
         */
        const sourceInstance = mount(<Source
            _={ fsLightboxInstance }
            i={ 0 }
        />).instance();
        const imageMock = new ImageMock(fsLightboxInstance);
        imageMock.fakeSourceDimensions();
        imageMock.createImageMock();
        fsLightboxInstance.sourceComponentsCreators[0].createSourceSizeAdjuster();
        fsLightboxInstance.sourceComponentsCreators[0].createSourceTransformer();
        fsLightboxInstance.sourceSizeAdjusters[0].adjustSourceSize = jest.fn();
        fsLightboxInstance.sourceTransformers[0].transform = jest.fn();
        sourceInstance.onSourceLoad();

        it('should call adjustSourceSize', () => {
            expect(fsLightboxInstance.sourceSizeAdjusters[0].adjustSourceSize).toBeCalled();
        });

        it('should call transform', () => {
            expect(fsLightboxInstance.sourceTransformers[0].transform).toBeCalled();
        });

        it('should add fslightbox-fade-in-class to source', () => {
            expect(fsLightboxInstance.elements.sources[0].current.classList.contains('fslightbox-fade-in-class'))
                .toBeTruthy();
        });
    });
});