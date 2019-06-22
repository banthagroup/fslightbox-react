import { SourceSizeAdjusterIterator } from "../../../src/core/sizes/SourceSizeAdjusterIterator";

const fsLightbox = {
    collections: {
        sourcesSizesAdjusters: []
    }
};
let mockAdjustSourceSize;
const sourceSizeAdjusterIterator = new SourceSizeAdjusterIterator(fsLightbox);

beforeEach(() => {
    mockAdjustSourceSize = jest.fn();
});

describe('calling adjustSourceSize right number of times', () => {
    it('should call adjustSourceSize for all items in array', () => {
        // for e.g. 3 items
        for (let i = 0; i < 3; i++) {
            fsLightbox.collections.sourcesSizesAdjusters.push({
                adjustSourceSize: mockAdjustSourceSize
            });
        }
        sourceSizeAdjusterIterator.adjustAllSourcesSizes();
        expect(mockAdjustSourceSize).toBeCalledTimes(3);
    });

    it('should call adjust sources size only two times in three items array due too second item is null', () => {
        fsLightbox.collections.sourcesSizesAdjusters[0] = { adjustSourceSize: mockAdjustSourceSize };
        fsLightbox.collections.sourcesSizesAdjusters[1] = null;
        fsLightbox.collections.sourcesSizesAdjusters[2] = { adjustSourceSize: mockAdjustSourceSize };
        sourceSizeAdjusterIterator.adjustAllSourcesSizes();
        expect(mockAdjustSourceSize).toBeCalledTimes(2);
    });
});
