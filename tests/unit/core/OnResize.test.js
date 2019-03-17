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
    const fsLightbox = mock.getWrapper();
    const fsLightboxInstance = mock.getInstance();
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


    it('should add and remove resize event listner', () => {
        const onResize = new OnResize(fsLightbox.instance());
        onResize._onResizeMethod = jest.fn();
        onResize.init();
        expect(onResize._onResizeMethod).not.toBeCalled();
        global.dispatchEvent(new Event('resize'));
        expect(onResize._onResizeMethod).toBeCalledTimes(1);
        onResize.removeListener();
        global.dispatchEvent(new Event('resize'));
        expect(onResize._onResizeMethod).toBeCalledTimes(1);
    });

    describe('onResizeMethod', () => {
        const onResize = new OnResize(fsLightboxInstance);
        onResize._saveMaxSourcesDimensions = jest.fn();
        onResize.adjustMediaHolderSize = jest.fn();
        fsLightboxInstance.core.sourceSizeAdjusterIterator.adjustAllSourcesSizes = jest.fn();
        const transformStageSourcesMock = new TransformStageSourcesMock(fsLightboxInstance);
        onResize._onResizeMethod();

        it('should call saveMaxSourcesDimensions', () => {
            expect(onResize._saveMaxSourcesDimensions).toBeCalled();
        });
        it('should call adjustMediaHolderSize', () => {
            expect(onResize.adjustMediaHolderSize).toBeCalled();
        });
        it('should call adjustAllSourcesSize', () => {
            expect(fsLightboxInstance.core.sourceSizeAdjusterIterator.adjustAllSourcesSizes).toBeCalled();
        });
        it('should call transformStageSources without setTimeouts', () => {
            expect(transformStageSourcesMock.withoutTimeout).toBeCalled();
        });
    });
});