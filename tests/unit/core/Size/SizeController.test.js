import React from 'react';
import { SizeController } from "../../../../src/core/Size/SizeController";
import {
    SOURCE_DIMENSIONS_BREAK,
    SOURCE_DIMENSIONS_DECREASE_VALUE
} from "../../../../src/constants/ResponsiveConstants";
import { FsLightboxEnzymeMock } from "../../../__mocks__/components/fsLightboxEnzymeMock";
import { TransformStageSourcesMock } from "../../../__mocks__/core/TransformStageSourcesMock";
import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";

describe('Down event', () => {
    const fsLightboxMock = new FsLightboxEnzymeMock();
    const fsLightboxInstance = fsLightboxMock.getInstance();
    /** @var { SizeController } sizeController */
    let sizeController;

    beforeEach(() => {
        sizeController = fsLightboxInstance.core.sizeController;
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
        sizeController.adjustMediaHolderSize();
        expect(fsLightboxInstance.elements.mediaHolder.current.style.width)
            .toEqual(100 + 'px');
        expect(fsLightboxInstance.elements.mediaHolder.current.style.height)
            .toEqual(100 + 'px');
    });
});

const fsLightboxMock = new FsLightboxMock();
const fsLightbox = fsLightboxMock.getFsLightbox();

describe('onResizeMethod', () => {
    const sizeController = fsLightbox.core.sizeController;
    sizeController.adjustMediaHolderSize = jest.fn();
    fsLightbox.core.sourceSizeAdjusterIterator.adjustAllSourcesSizes = jest.fn();
    const transformStageSourcesMock = new TransformStageSourcesMock(fsLightbox);
    fsLightbox.core.eventsControllers.window.resize.attachListener();

    it(`should set maxSourceWidth to window.innerWidth 
            due to window.innerWidth is less than SOURCE_DIMENSION_BREAK`, () => {
        global.window.innerWidth = SOURCE_DIMENSIONS_BREAK - 50;
        global.dispatchEvent(new Event('resize'));
        expect(fsLightbox.sourcesData.maxSourceWidth).toEqual(SOURCE_DIMENSIONS_BREAK - 50);
    });

    it(`should set maxSourceWidth to window.innerWidth decreased by SOURCE_DIMENSIONS_DECREASE_VALUE 
            due to window.innerWidth is more than SOURCE_DIMENSION_BREAK`, () => {
        global.window.innerWidth = SOURCE_DIMENSIONS_BREAK + 50;
        global.dispatchEvent(new Event('resize'));
        expect(fsLightbox.sourcesData.maxSourceWidth)
            .toEqual(global.window.innerWidth - (global.window.innerWidth * SOURCE_DIMENSIONS_DECREASE_VALUE));
    });

    it('should set maxSourceHeight to window.innerHeight decreased by SOURCE_DIMENSIONS_DECREASE_VALUE', () => {
        global.dispatchEvent(new Event('resize'));
        expect(fsLightbox.sourcesData.maxSourceHeight)
            .toEqual(global.window.innerHeight - (global.window.innerHeight * SOURCE_DIMENSIONS_DECREASE_VALUE));
    });

    it('should call adjustMediaHolderSize', () => {
        global.dispatchEvent(new Event('resize'));
        expect(sizeController.adjustMediaHolderSize).toBeCalled();
    });
    it('should call adjustAllSourcesSize', () => {
        global.dispatchEvent(new Event('resize'));
        expect(fsLightbox.core.sourceSizeAdjusterIterator.adjustAllSourcesSizes).toBeCalled();
    });
    it('should call transformStageSources without setTimeouts', () => {
        global.dispatchEvent(new Event('resize'));
        expect(transformStageSourcesMock.withoutTimeout).toBeCalled();
    });
});