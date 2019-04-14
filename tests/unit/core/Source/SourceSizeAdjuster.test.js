import React from 'react';
import { SourceSizeAdjuster } from "../../../../src/Core/Sizes/SourceSizeAdjuster";
import { testSourceDimensions } from "../../../schemas/testVariables";
import { getMountedImageForFsLightboxInstance } from "../../../__mocks__/helpers/getMountedImageForFsLightboxInstance";
import { getDecreasedDimensionValue } from "../../../__mocks__/helpers/getDecreasedDimensionValue";
import { FsLightboxEnzymeMock } from "../../../__mocks__/components/fsLightboxEnzymeMock";

describe('SourceSizeChange', () => {
    const fsLightboxMock = new FsLightboxEnzymeMock();
    const fsLightboxInstance = fsLightboxMock.getInstance();

    describe('it should adjust source size when ...', () => {
        getMountedImageForFsLightboxInstance(fsLightboxInstance);
        const sourceSizeAdjuster = new SourceSizeAdjuster(fsLightboxInstance);

        fsLightboxInstance.sourcesData.sourcesDimensions[0] = testSourceDimensions;
        sourceSizeAdjuster.setIndex(0);
        const image = fsLightboxInstance.elements.sources[0].current;

        test('source width > window width & source height > window height', () => {
            window.innerWidth = 1500;
            window.innerHeight = 1400;
            dispatchEvent(new Event('resize'));
            sourceSizeAdjuster.adjustSourceSize();
            expect(parseInt(image.style.width)).toEqual(getDecreasedDimensionValue(1400));
            expect(parseInt(image.style.height)).toEqual(getDecreasedDimensionValue(1400));
        });


        test('source width > window width & source height < window height', () => {
            window.innerWidth = 1500;
            window.innerHeight = 2500;
            dispatchEvent(new Event('resize'));
            sourceSizeAdjuster.adjustSourceSize();
            expect(parseInt(image.style.width)).toEqual(getDecreasedDimensionValue(1500));
            expect(parseInt(image.style.height)).toEqual(getDecreasedDimensionValue(1500));
        });


        test('source width < window width & source height > window height', () => {
            window.innerWidth = 2500;
            window.innerHeight = 1500;
            dispatchEvent(new Event('resize'));
            sourceSizeAdjuster.adjustSourceSize();
            expect(parseInt(image.style.width)).toEqual(getDecreasedDimensionValue(1500));
            expect(parseInt(image.style.height)).toEqual(getDecreasedDimensionValue(1500));
        });


        test('source width < window width & source height < window height', () => {
            window.innerWidth = 2500;
            window.innerHeight = 2400;
            dispatchEvent(new Event('resize'));
            sourceSizeAdjuster.adjustSourceSize();
            expect(parseInt(image.style.width)).toEqual(2000);
            expect(parseInt(image.style.height)).toEqual(2000);
        });
    });
});