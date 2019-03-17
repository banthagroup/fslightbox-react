import React from 'react';
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import  { SourceSizeAdjuster } from "../../../../src/core/Source/SourceSizeAdjuster";
import { testSourceDimensions } from "../../../schemas/testVariables";
import { getMountedImageForFsLightboxInstance } from "../../../__mocks__/helpers/getMountedImageForFsLightboxInstance";
import { getDecreasedDimensionValue } from "../../../__mocks__/helpers/getDecreasedDimensionValue";

describe('SourceSizeChange', () => {
    const fsLightboxMock = new FsLightboxMock();
    const fsLightboxInstance = fsLightboxMock.getInstance();

    describe('it should adjust source size when ...', () => {
        const sourceSizeAdjuster = new SourceSizeAdjuster(fsLightboxInstance);
        getMountedImageForFsLightboxInstance(fsLightboxInstance);
        fsLightboxInstance.sourcesData.sourcesDimensions[0] = testSourceDimensions;
        sourceSizeAdjuster.setIndex(0);
        const image = fsLightboxInstance.elements.sources[0].current;

        test('source width > window width & source height > window height', () => {
            global.window.innerWidth = 1500;
            global.window.innerHeight = 1400;
            global.dispatchEvent(new Event('resize'));
            sourceSizeAdjuster.adjustSourceSize();
            expect(parseInt(image.style.width)).toEqual(getDecreasedDimensionValue(1400));
            expect(parseInt(image.style.height)).toEqual(getDecreasedDimensionValue(1400));
        });


        test('source width > window width & source height < window height', () => {
            global.window.innerWidth = 1500;
            global.window.innerHeight = 2500;
            global.dispatchEvent(new Event('resize'));
            sourceSizeAdjuster.adjustSourceSize();
            expect(parseInt(image.style.width)).toEqual(getDecreasedDimensionValue(1500));
            expect(parseInt(image.style.height)).toEqual(getDecreasedDimensionValue(1500));
        });


        test('source width < window width & source height > window height', () => {
            global.window.innerWidth = 2500;
            global.window.innerHeight = 1500;
            global.dispatchEvent(new Event('resize'));
            sourceSizeAdjuster.adjustSourceSize();
            expect(parseInt(image.style.width)).toEqual(getDecreasedDimensionValue(1500));
            expect(parseInt(image.style.height)).toEqual(getDecreasedDimensionValue(1500));
        });


        test('source width < window width & source height < window height', () => {
            global.window.innerWidth = 2500;
            global.window.innerHeight = 2400;
            global.dispatchEvent(new Event('resize'));
            sourceSizeAdjuster.adjustSourceSize();
            expect(parseInt(image.style.width)).toEqual(2000);
            expect(parseInt(image.style.height)).toEqual(2000);
        });
    });
});