import React from 'react';
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { mount } from "enzyme";
import Image from "../../../../src/components/sources/properSources/Image";
import { SOURCE_DIMENSIONS_DECREASE_VALUE } from "../../../../src/constants/ResponsiveConstants";
import { SourceSizeAdjuster } from "../../../../src/core/Source/SourceSizeAdjuster";

describe('SourceSizeChange', () => {
    const fsLightboxMock = new FsLightboxMock();
    const fsLightboxInstance = fsLightboxMock.getInstance();

    describe('setUpSourceByIndex', () => {
        const sourceSizeAdjuster = new SourceSizeAdjuster(fsLightboxInstance);

        const mockImg = document.createElement('img');
        fsLightboxInstance.elements.sources[0].current = mockImg;
        fsLightboxInstance.sourceDimensions[0] = {
            width: 1500,
            height: 1000,
        };
        sourceSizeAdjuster.setUpSourceByIndex(0);

        it('should set up index', () => {
            expect(sourceSizeAdjuster.index).toEqual(0);
        });

        it('should set up element', () => {
            expect(sourceSizeAdjuster.element).toEqual(mockImg);
        });

        it('should set up source width', () => {
            expect(sourceSizeAdjuster.sourceWidth).toEqual(1500);
        });

        it('should set up source height', () => {
            expect(sourceSizeAdjuster.sourceHeight).toEqual(1000);
        });

        it('should set up dimension ratio', () => {
            expect(sourceSizeAdjuster.ratio).toEqual(1.5);
        })
    });

    describe('it should adjust source size when ...', () => {
        const sourceSizeAdjuster = new SourceSizeAdjuster(fsLightboxInstance);
        mount(<Image
            fsLightbox={ fsLightboxInstance }
            index={ 0 }
            onSourceLoad={ jest.fn() }
        />);
        fsLightboxInstance.sourceDimensions[0] = {
            width: 2000,
            height: 2000
        };
        sourceSizeAdjuster.setUpSourceByIndex(0);
        const image = fsLightboxInstance.elements.sources[0].current;

        test('source width > window width & source height > window height', () => {
            global.window.innerWidth = 1500;
            global.window.innerHeight = 1400;
            fsLightboxInstance.onResize.saveMaxSourcesDimensions();
            sourceSizeAdjuster.adjustSourceSize();
            expect(parseInt(image.style.width)).toEqual(1400 - (1400 * SOURCE_DIMENSIONS_DECREASE_VALUE));
            expect(parseInt(image.style.height)).toEqual(1400 - (1400 * SOURCE_DIMENSIONS_DECREASE_VALUE));
        });


        test('source width > window width & source height < window height', () => {
            global.window.innerWidth = 1500;
            global.window.innerHeight = 2500;
            fsLightboxInstance.onResize.saveMaxSourcesDimensions();
            sourceSizeAdjuster.adjustSourceSize();
            expect(parseInt(image.style.width)).toEqual(1500 - (1500 * SOURCE_DIMENSIONS_DECREASE_VALUE));
            expect(parseInt(image.style.height)).toEqual(1500 - (1500 * SOURCE_DIMENSIONS_DECREASE_VALUE));
        });


        test('source width < window width & source height > window height', () => {
            global.window.innerWidth = 2500;
            global.window.innerHeight = 1500;
            fsLightboxInstance.onResize.saveMaxSourcesDimensions();
            sourceSizeAdjuster.adjustSourceSize();
            expect(parseInt(image.style.width)).toEqual(1500 - (1500 * SOURCE_DIMENSIONS_DECREASE_VALUE));
            expect(parseInt(image.style.height)).toEqual(1500 - (1500 * SOURCE_DIMENSIONS_DECREASE_VALUE));
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