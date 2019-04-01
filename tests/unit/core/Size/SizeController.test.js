import React from 'react';
import {
    SOURCE_DIMENSIONS_BREAK,
    SOURCE_DIMENSIONS_DECREASE_VALUE
} from "../../../../src/constants/ResponsiveConstants";
import { FsLightboxEnzymeMock } from "../../../__mocks__/components/fsLightboxEnzymeMock";


describe('Down event', () => {
    const fsLightboxMock = new FsLightboxEnzymeMock();
    const fsLightboxInstance = fsLightboxMock.getInstance();
    /** @var { SizeController } sizeController */
    let sizeController;

    beforeEach(() => {
        sizeController = fsLightboxInstance.core.sizeController;
    });

    it('should save max Sources dimensions', () => {
        window.innerWidth = SOURCE_DIMENSIONS_BREAK - 100;
        dispatchEvent(new Event('resize'));
        expect(fsLightboxInstance.sourcesData.maxSourceWidth).toEqual(window.innerWidth);
        expect(fsLightboxInstance.sourcesData.maxSourceHeight)
            .toEqual(window.innerHeight - (window.innerHeight * SOURCE_DIMENSIONS_DECREASE_VALUE));

        window.innerWidth = SOURCE_DIMENSIONS_BREAK + 100;
        dispatchEvent(new Event('resize'));
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