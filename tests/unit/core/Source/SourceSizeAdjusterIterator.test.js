import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import SourceSizeAdjusterIterator from "../../../../src/core/Source/SourceSizeAdjusterIterator";

describe('SourceSizeAdjusterIterator', () => {
    const fsLightboxMock = new FsLightboxMock();
    const fsLightboxInstance = fsLightboxMock.getInstance();

    const sourceSizeAdjusterIterator = new SourceSizeAdjusterIterator(fsLightboxInstance);
    let mockAdjustSourceSize;

    beforeEach(() => {
        mockAdjustSourceSize = jest.fn();
    });

    it('should call adjustSourceSize for all items in array', () => {
        fsLightboxInstance.collections.sourceSizeAdjusters = [
            {
                adjustSourceSize: mockAdjustSourceSize
            },
            {
                adjustSourceSize: mockAdjustSourceSize
            },
            {
                adjustSourceSize: mockAdjustSourceSize
            }
        ];
        sourceSizeAdjusterIterator.adjustAllSourcesSizes();
        expect(mockAdjustSourceSize).toBeCalledTimes(3);
    });

    it('should call adjust source size only two times in three items array due too second item is null', () => {
        fsLightboxInstance.collections.sourceSizeAdjusters = [
            {
                adjustSourceSize: mockAdjustSourceSize
            },
            null,
            {
                adjustSourceSize: mockAdjustSourceSize
            }
        ];
        sourceSizeAdjusterIterator.adjustAllSourcesSizes();
        expect(mockAdjustSourceSize).toBeCalledTimes(2);
    });
});