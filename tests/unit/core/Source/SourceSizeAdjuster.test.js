import React from 'react';
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import  { SourceSizeAdjuster } from "../../../../src/core/Source/SourceSizeAdjuster";
import { testSourceDimensions } from "../../../schemas/testVariables";
import { getMountedImageForFsLightboxInstance } from "../../../__mocks__/helpers/getMountedImageForFsLightboxInstance";
import { getDecreasedDimensionValue } from "../../../__mocks__/helpers/getDecreasedDimensionValue";

describe('SourceSizeChange', () => {
    const fsLightboxMock = new FsLightboxMock();
    const fsLightboxInstance = fsLightboxMock.getInstance();

    describe('setIndex', () => {
        const sourceSizeAdjuster = new SourceSizeAdjuster(fsLightboxInstance);
        const mockImg = document.createElement('img');
        fsLightboxInstance.elements.sources[0].current = mockImg;
        fsLightboxInstance.sourceDimensions[0] = testSourceDimensions;
        sourceSizeAdjuster.setIndex(0);

        it('should set up i', () => {
            expect(sourceSizeAdjuster.i).toEqual(0);
        });

        it('should set up source width', () => {
            expect(sourceSizeAdjuster.sourceWidth).toEqual(testSourceDimensions.width);
        });

        it('should set up source height', () => {
            expect(sourceSizeAdjuster.sourceHeight).toEqual(testSourceDimensions.height);
        });

        it('should set up dimension ratio', () => {
            expect(sourceSizeAdjuster.ratio).toEqual(testSourceDimensions.width / testSourceDimensions.height);
        })
    });

    describe('it should adjust source size when ...', () => {
        const sourceSizeAdjuster = new SourceSizeAdjuster(fsLightboxInstance);
        getMountedImageForFsLightboxInstance(fsLightboxInstance);
        fsLightboxInstance.sourceDimensions[0] = testSourceDimensions;
        sourceSizeAdjuster.setIndex(0);
        const image = fsLightboxInstance.elements.sources[0].current;

        test('source width > window width & source height > window height', () => {
            global.window.innerWidth = 1500;
            global.window.innerHeight = 1400;
            fsLightboxInstance.onResize.saveMaxSourcesDimensions();
            sourceSizeAdjuster.adjustSourceSize();
            expect(parseInt(image.style.width)).toEqual(getDecreasedDimensionValue(1400));
            expect(parseInt(image.style.height)).toEqual(getDecreasedDimensionValue(1400));
        });


        test('source width > window width & source height < window height', () => {
            global.window.innerWidth = 1500;
            global.window.innerHeight = 2500;
            fsLightboxInstance.onResize.saveMaxSourcesDimensions();
            sourceSizeAdjuster.adjustSourceSize();
            expect(parseInt(image.style.width)).toEqual(getDecreasedDimensionValue(1500));
            expect(parseInt(image.style.height)).toEqual(getDecreasedDimensionValue(1500));
        });


        test('source width < window width & source height > window height', () => {
            global.window.innerWidth = 2500;
            global.window.innerHeight = 1500;
            fsLightboxInstance.onResize.saveMaxSourcesDimensions();
            sourceSizeAdjuster.adjustSourceSize();
            expect(parseInt(image.style.width)).toEqual(getDecreasedDimensionValue(1500));
            expect(parseInt(image.style.height)).toEqual(getDecreasedDimensionValue(1500));
        });


        test('source width < window width & source height < window height', () => {
            global.window.innerWidth = 2500;
            global.window.innerHeight = 2400;
            fsLightboxInstance.onResize.saveMaxSourcesDimensions();
            sourceSizeAdjuster.adjustSourceSize();
            expect(parseInt(image.style.width)).toEqual(2000);
            expect(parseInt(image.style.height)).toEqual(2000);
        });
    });
});