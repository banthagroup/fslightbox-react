import { FsLightboxMock } from "../../../__mocks__/components/fsLightboxMock";
import { SourceSizeAdjusterIterator } from "../../../../src/core/Source/SourceSizeAdjusterIterator";

describe('SourceSizeAdjusterIterator', () => {
    const fsLightboxMock = new FsLightboxMock();
    const fsLightboxInstance = fsLightboxMock.getInstance();
    fsLightboxInstance.sourceSizeAdjusters = [
        {
            adjustSourceSize: jest.fn()
        },
        null,
        {
            adjustSourceSize: jest.fn()
        }
    ];

    const sourceSizeAdjusterIterator = new SourceSizeAdjusterIterator(fsLightboxInstance);

    it('should return that there is next iteration', () => {
        expect(sourceSizeAdjusterIterator.hasNext()).toBeTruthy();
        sourceSizeAdjusterIterator.index++;
        expect(sourceSizeAdjusterIterator.hasNext()).toBeTruthy();
        sourceSizeAdjusterIterator.index++;
        expect(sourceSizeAdjusterIterator.hasNext()).toBeTruthy();
        sourceSizeAdjusterIterator.index++;
        expect(sourceSizeAdjusterIterator.hasNext()).toBeFalsy();
    });

    it('should return that SourceSizeAdjuster is null', () => {
        sourceSizeAdjusterIterator.index = 0;
        expect(sourceSizeAdjusterIterator.isNull()).toBeFalsy();
        sourceSizeAdjusterIterator.index = 1;
        expect(sourceSizeAdjusterIterator.isNull()).toBeTruthy();
    });

    it('should adjustSourceSize from objects two times', () => {
        sourceSizeAdjusterIterator.adjustAllSourcesSizes();
        expect(fsLightboxInstance.sourceSizeAdjusters[0].adjustSourceSize).toBeCalled();
        expect(fsLightboxInstance.sourceSizeAdjusters[2].adjustSourceSize).toBeCalled();
    });

    it('should call adjustSourceSize 3 times', () => {
        sourceSizeAdjusterIterator.adjustSourceSize = jest.fn();
        sourceSizeAdjusterIterator.adjustAllSourcesSizes();
        expect(sourceSizeAdjusterIterator.adjustSourceSize).toBeCalledTimes(3);
    });

});