import React from 'react';
import { OnResize } from "../../../src/core/OnResize";
import {
    SOURCE_DIMENSIONS_BREAK,
    SOURCE_DIMENSIONS_DECREASE_VALUE
} from "../../../src/constants/ResponsiveConstants";
import { FsLightboxMock } from "../../__mocks__/components/fsLightboxMock";
import { TransformStageSourcesMock } from "../../__mocks__/core/TransformStageSourcesMock";

describe('Resize event', () => {
    const mock = new FsLightboxMock();
    const fsLightboxInstance = mock.getInstance();
    /**
     * @var { OnResize } onResize
     */
    let onResize;

    beforeEach(() => {
        onResize = new OnResize(fsLightboxInstance);
    });

    it('should save max sources dimensions', () => {
        global.window.innerWidth = SOURCE_DIMENSIONS_BREAK - 100;
        global.dispatchEvent(new Event('resize'));
        expect(fsLightboxInstance.sourcesData.maxSourceWidth).toEqual(window.innerWidth);
        expect(fsLightboxInstance.sourcesData.maxSourceHeight)
            .toEqual(window.innerHeight - (window.innerHeight * SOURCE_DIMENSIONS_DECREASE_VALUE));

        global.window.innerWidth = SOURCE_DIMENSIONS_BREAK + 100;
        global.dispatchEvent(new Event('resize'));
        expect(fsLightboxInstance.sourcesData.maxSourceWidth)
            .toEqual(window.innerWidth - (window.innerWidth * SOURCE_DIMENSIONS_DECREASE_VALUE));
        expect(fsLightboxInstance.sourcesData.maxSourceHeight)
            .toEqual(window.innerHeight - (window.innerHeight * SOURCE_DIMENSIONS_DECREASE_VALUE))
    });

    it('should resize source holder', () => {
        fsLightboxInstance.sourcesData.maxSourceWidth = 100;
        fsLightboxInstance.sourcesData.maxSourceHeight = 100;
        onResize.adjustMediaHolderSize();
        expect(fsLightboxInstance.elements.mediaHolder.current.style.width)
            .toEqual(100 + 'px');
        expect(fsLightboxInstance.elements.mediaHolder.current.style.height)
            .toEqual(100 + 'px');
    });


    it('should add and remove resize event listener', () => {
        onResize.adjustMediaHolderSize = jest.fn();
        onResize.init();
        expect(onResize.adjustMediaHolderSize).toBeCalledTimes(1);
        global.dispatchEvent(new Event('resize'));
        expect(onResize.adjustMediaHolderSize).toBeCalledTimes(2);
        onResize.removeListener();
        global.dispatchEvent(new Event('resize'));
        expect(onResize.adjustMediaHolderSize).toBeCalledTimes(2);
    });

    describe('onResizeMethod', () => {
        const onResize = new OnResize(fsLightboxInstance);
        onResize.adjustMediaHolderSize = jest.fn();
        fsLightboxInstance.core.sourceSizeAdjusterIterator.adjustAllSourcesSizes = jest.fn();
        const transformStageSourcesMock = new TransformStageSourcesMock(fsLightboxInstance);
        onResize.attachListener();

        it(`should set maxSourceWidth to window.innerWidth 
            due to window.innerWidth is less than SOURCE_DIMENSION_BREAK`, () => {
            global.window.innerWidth = SOURCE_DIMENSIONS_BREAK - 50;
            global.dispatchEvent(new Event('resize'));
            expect(fsLightboxInstance.sourcesData.maxSourceWidth).toEqual(SOURCE_DIMENSIONS_BREAK - 50);
        });

        it(`should set maxSourceWidth to window.innerWidth decreased by SOURCE_DIMENSIONS_DECREASE_VALUE 
            due to window.innerWidth is more than SOURCE_DIMENSION_BREAK`, () => {
            global.window.innerWidth = SOURCE_DIMENSIONS_BREAK + 50;
            global.dispatchEvent(new Event('resize'));
            expect(fsLightboxInstance.sourcesData.maxSourceWidth)
                .toEqual(global.window.innerWidth - (global.window.innerWidth * SOURCE_DIMENSIONS_DECREASE_VALUE));
        });

        it('should set maxSourceHeight to window.innerHeight decreased by SOURCE_DIMENSIONS_DECREASE_VALUE', () => {
            global.dispatchEvent(new Event('resize'));
            expect(fsLightboxInstance.sourcesData.maxSourceHeight)
                .toEqual(global.window.innerHeight - (global.window.innerHeight * SOURCE_DIMENSIONS_DECREASE_VALUE));
        });

        it('should call adjustMediaHolderSize', () => {
            global.dispatchEvent(new Event('resize'));
            expect(onResize.adjustMediaHolderSize).toBeCalled();
        });
        it('should call adjustAllSourcesSize', () => {
            global.dispatchEvent(new Event('resize'));
            expect(fsLightboxInstance.core.sourceSizeAdjusterIterator.adjustAllSourcesSizes).toBeCalled();
        });
        it('should call transformStageSources without setTimeouts', () => {
            global.dispatchEvent(new Event('resize'));
            expect(transformStageSourcesMock.withoutTimeout).toBeCalled();
        });
    });
});