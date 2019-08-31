import { SourceStyler } from "./SourceStyler";
import { SourceStylerBucket } from "./SourceStylerBucket";

const fsLightbox = {
    data: { captionedSourcesHoldersScales: [] },
    elements: {
        captions: [{ current: { offsetHeight: 500 } }],
        sources: [{ current: { style: {} } }],
        thumbsContainer: { current: { offsetHeight: 1000 } }
    },
    injector: {
        resolve: (constructor, params) => {
            if (constructor === SourceStylerBucket) {
                expect(params).toEqual([0, 2000, 2000]);
                return sourceStylerBucket;
            }
        }
    }
};
const sourceStylerBucket = {
    setIndex: jest.fn(),
    setDefaultDimensions: jest.fn(),
    ifSourcesScaledResetScale: jest.fn(),
    styleSourceUsingScaleAndHeight: jest.fn()
};
const sourceStyler = new SourceStyler(fsLightbox, 0, 2000, 2000);

test('styleAll', () => {
    const cachedStyleSize = sourceStyler.styleSize;
    const cachedStyleScale = sourceStyler.styleScale;

    sourceStyler.styleSize = jest.fn();
    sourceStyler.styleScale = jest.fn();
    sourceStyler.styleAll();
    expect(sourceStyler.styleSize).toBeCalled();
    expect(sourceStyler.styleScale).toBeCalled();

    sourceStyler.styleSize = cachedStyleSize;
    sourceStyler.styleScale = cachedStyleScale;
});

test('styleSize', () => {
    const assertDimensions = (width, height) => {
        expect(fsLightbox.elements.sources[0].current.style.width).toBe(width + 'px');
        expect(fsLightbox.elements.sources[0].current.style.height).toBe(height + 'px');
    };

    fsLightbox.data.maxSourceWidth = 1500;
    fsLightbox.data.maxSourceHeight = 1400;
    sourceStyler.styleSize();
    assertDimensions(1400, 1400);

    fsLightbox.data.maxSourceWidth = 1500;
    fsLightbox.data.maxSourceHeight = 2500;
    sourceStyler.styleSize();
    assertDimensions(1500, 1500);

    fsLightbox.data.maxSourceWidth = 2500;
    fsLightbox.data.maxSourceHeight = 1500;
    sourceStyler.styleSize();
    assertDimensions(1500, 1500);

    fsLightbox.data.maxSourceWidth = 2500;
    fsLightbox.data.maxSourceHeight = 2400;
    sourceStyler.styleSize();
    assertDimensions(2000, 2000);
});

test('styleScale', () => {
    fsLightbox.data.isThumbing = true;
    fsLightbox.data.thumbedSourcesScale = 0.5;
    sourceStyler.styleScale();
    expect(sourceStylerBucket.styleSourceUsingScaleAndHeight).toBeCalledWith(0.5, 1000);
    expect(sourceStylerBucket.ifSourcesScaledResetScale).not.toBeCalled();

    fsLightbox.data.isThumbing = undefined;
    fsLightbox.data.captionedSourcesHoldersScales[0] = 0.25;
    sourceStyler.styleScale();
    expect(sourceStylerBucket.styleSourceUsingScaleAndHeight).toBeCalledWith(0.25, 500);
    expect(sourceStylerBucket.ifSourcesScaledResetScale).not.toBeCalled();

    fsLightbox.data.isThumbing = undefined;
    fsLightbox.data.captionedSourcesHoldersScales[0] = undefined;
    sourceStyler.styleScale();
    expect(sourceStylerBucket.styleSourceUsingScaleAndHeight).toBeCalledTimes(2);
    expect(sourceStylerBucket.ifSourcesScaledResetScale).toBeCalled();
});
