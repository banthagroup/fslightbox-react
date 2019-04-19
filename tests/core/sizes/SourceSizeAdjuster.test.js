import { SourceSizeAdjuster } from "../../../src/core/sizes/SourceSizeAdjuster";
import { testSourceDimensions } from "../../__tests-helpers__/testVariables";

const source = document.createElement('div');
const fsLightbox = {
    sourcesData: {
        maxSourceWidth: 0,
        maxSourceHeight: 0,
    },
    elements: {
        sources: [{
            current: source
        }]
    }
};
const sourceSizeAdjuster = new SourceSizeAdjuster(fsLightbox);

describe('it should adjust sources size when ...', () => {
    sourceSizeAdjuster.setMaxDimensions(testSourceDimensions.width, testSourceDimensions.height);
    sourceSizeAdjuster.setIndex(0);

    test(`sources width > max source width (SourcesHoldersWrapper dynamic width) 
        & sources height > max source height (SourceHoldersWrapper dynamic height)`, () => {
        fsLightbox.sourcesData.maxSourceWidth = 1500;
        fsLightbox.sourcesData.maxSourceHeight = 1400;
        sourceSizeAdjuster.adjustSourceSize();
        expect(parseInt(source.style.width)).toEqual(1400);
        expect(parseInt(source.style.height)).toEqual(1400);
    });

    test(`sources width > max source width (SourcesHoldersWrapper dynamic width) 
        & sources height < max source height (SourceHoldersWrapper dynamic height)`, () => {
        fsLightbox.sourcesData.maxSourceWidth = 1500;
        fsLightbox.sourcesData.maxSourceHeight = 2500;
        sourceSizeAdjuster.adjustSourceSize();
        expect(parseInt(source.style.width)).toEqual(1500);
        expect(parseInt(source.style.height)).toEqual(1500);
    });

    test(`sources width < max source width (SourcesHoldersWrapper dynamic width) 
        & sources height > max source height (SourceHoldersWrapper dynamic height)`, () => {
        fsLightbox.sourcesData.maxSourceWidth = 2500;
        fsLightbox.sourcesData.maxSourceHeight = 1500;
        sourceSizeAdjuster.adjustSourceSize();
        expect(parseInt(source.style.width)).toEqual(1500);
        expect(parseInt(source.style.height)).toEqual(1500);
    });

    test(`sources width < max source width (SourcesHoldersWrapper dynamic width) 
        & sources height < max source height (SourceHoldersWrapper dynamic height)`, () => {
        fsLightbox.sourcesData.maxSourceWidth = 2500;
        fsLightbox.sourcesData.maxSourceHeight = 2400;
        sourceSizeAdjuster.adjustSourceSize();
        expect(parseInt(source.style.width)).toEqual(2000);
        expect(parseInt(source.style.height)).toEqual(2000);
    });
});
