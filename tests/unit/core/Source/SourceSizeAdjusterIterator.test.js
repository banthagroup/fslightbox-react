import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { SourceSizeAdjusterIterator } from "../../../../src/core/sizes/SourceSizeAdjusterIterator";

describe('SourceSizeAdjusterIterator', () => {
    const fsLightboxMock = new FsLightboxMock();
    const fsLightboxInstance = fsLightboxMock.getFsLightbox();

    const sourceSizeAdjusterIterator = new SourceSizeAdjusterIterator(fsLightboxInstance);
    let mockAdjustSourceSize;

    beforeEach(() => {
        mockAdjustSourceSize = jest.fn();
    });

    it('should call adjustSourceSize for all items in array', () => {
        // for e.g. 3 items
        for(let i = 0; i < 3; i++) {
            fsLightboxInstance.collections.sourceSizeAdjusters.push({
                adjustSourceSize: mockAdjustSourceSize
            });
        }
        sourceSizeAdjusterIterator.adjustAllSourcesSizes();
        expect(mockAdjustSourceSize).toBeCalledTimes(3);
    });

    it('should call adjust sources size only two times in three items array due too second item is null', () => {
        fsLightboxInstance.collections.sourceSizeAdjusters[0] = {adjustSourceSize: mockAdjustSourceSize};
        fsLightboxInstance.collections.sourceSizeAdjusters[1] = null;
        fsLightboxInstance.collections.sourceSizeAdjusters[2] = {adjustSourceSize: mockAdjustSourceSize};
        sourceSizeAdjusterIterator.adjustAllSourcesSizes();
        expect(mockAdjustSourceSize).toBeCalledTimes(2);
    });
});