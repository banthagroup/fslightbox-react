import { TEST_IMAGE_URL, TEST_VIDEO_URL, TEST_YOUTUBE_URL } from "../../../__tests-helpers__/testVariables";
import { IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../../src/constants/coreConstants";
import { SourceTypeGetter } from "../../../../src/core/sources/creating/SourceTypeGetter";


/** @type SourceTypeGetter */
let sourceTypeChecker;

beforeEach(() => {
    sourceTypeChecker = new SourceTypeGetter();
});

it('should resolve image type', () => {
     sourceTypeChecker.setUrlToCheck(TEST_IMAGE_URL);
     return sourceTypeChecker.getSourceType().then(sourceType => {
         expect(sourceType).toEqual(IMAGE_TYPE);
     });
});

it('should resolve video type', () => {
    sourceTypeChecker.setUrlToCheck(TEST_VIDEO_URL);
    return sourceTypeChecker.getSourceType().then(sourceType => {
        expect(sourceType).toEqual(VIDEO_TYPE);
    });
});

it('should resolve youtube type', () => {
    sourceTypeChecker.setUrlToCheck(TEST_YOUTUBE_URL);
    return sourceTypeChecker.getSourceType().then(sourceType => {
        expect(sourceType).toEqual(YOUTUBE_TYPE);
    });
});

it('should resolve invalid type', () => {
    sourceTypeChecker.setUrlToCheck('lol');
    return sourceTypeChecker.getSourceType().then(sourceType => {
        expect(sourceType).toEqual(INVALID_TYPE);
    });
});

