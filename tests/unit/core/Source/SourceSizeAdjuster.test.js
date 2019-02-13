import React from 'react';
import { SourceSizeAdjuster } from "../../../../src/core/Source/SourceSizeAdjuster";
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { mount } from "enzyme";
import Image from "../../../../src/components/sources/properSources/Image";
import { MEDIA_HOLDER_SIZE_DECREASE_VALUE } from "../../../../src/constants/ResponsiveConstants";

describe('SourceSizeChange', () => {
    const fsLightboxMock = new FsLightboxMock();
    const fsLightboxInstance = fsLightboxMock.getInstance();
    const sourceSizeAdjuster = new SourceSizeAdjuster(fsLightboxInstance);

    it('should set max sources dimensions', () => {
        sourceSizeAdjuster.setMaxSourceDimensions();
        expect(sourceSizeAdjuster.maxWidth)
            .toEqual(parseInt(fsLightboxInstance.elements.mediaHolder.current.style.width));
        expect(sourceSizeAdjuster.maxHeight)
            .toEqual(parseInt(fsLightboxInstance.elements.mediaHolder.current.style.height));
    });

    describe('it should adjust source size when ...', () => {
        let image;
        beforeEach(() => {
            mount(<Image
                fsLightbox={ fsLightboxInstance }
                index={ 0 }
                onSourceLoad={ jest.fn() }
            />);
            image = fsLightboxInstance.elements.sources[0].current;
            global.window.innerWidth = 1500;
            global.window.innerHeight = 1500;
            fsLightboxInstance.onResize.adjustMediaHolderSize();
            sourceSizeAdjuster.setMaxSourceDimensions();
        });

        test('source width > window width & source height > window height', () => {
            fsLightboxInstance.sourceDimensions[0] = {
                width: 2000,
                height: 2000
            };
            sourceSizeAdjuster.adjustSourceSize(0);
            expect(parseInt(image.style.width)).toEqual(1500 - (1500 * MEDIA_HOLDER_SIZE_DECREASE_VALUE));
            expect(parseInt(image.style.height)).toEqual(1500 - (1500 * MEDIA_HOLDER_SIZE_DECREASE_VALUE));
        });


        test('source width > window width & source height < window height', () => {
            fsLightboxInstance.sourceDimensions[0] = {
                width: 2000,
                height: 1000
            };
            sourceSizeAdjuster.adjustSourceSize(0);
            expect(parseInt(image.style.width)).toEqual(1500 - (1500 * MEDIA_HOLDER_SIZE_DECREASE_VALUE));
            expect(parseInt(image.style.height)).toEqual(750 - (750 * MEDIA_HOLDER_SIZE_DECREASE_VALUE));
        });


        test('source width < window width & source height > window height', () => {
            fsLightboxInstance.sourceDimensions[0] = {
                width: 1000,
                height: 2000
            };
            sourceSizeAdjuster.adjustSourceSize(0);
            expect(parseInt(image.style.width)).toEqual(750 - (750 * MEDIA_HOLDER_SIZE_DECREASE_VALUE));
            expect(parseInt(image.style.height)).toEqual(1500 - (1500 * MEDIA_HOLDER_SIZE_DECREASE_VALUE));
        });


        test('source width < window width & source height < window height', () => {
            fsLightboxInstance.sourceDimensions[0] = {
                width: 1000,
                height: 1000
            };
            sourceSizeAdjuster.adjustSourceSize(0);
            expect(parseInt(image.style.width)).toEqual(1000);
            expect(parseInt(image.style.height)).toEqual(1000);
        });
    });
});