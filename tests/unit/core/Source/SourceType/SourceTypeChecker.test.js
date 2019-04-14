import { testImageURL, testVideoURL, testYoutubeURL } from "../../../../schemas/testVariables";
import { IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../../../src/constants/CoreConstants";
import { SourceTypeGetter } from "../../../../../src/core/Sources/Creating/SourceTypeGetter";


/** @type SourceTypeGetter */
let sourceTypeChecker;

beforeEach(() => {
    sourceTypeChecker = new SourceTypeGetter();
});

it('should resolve image type', () => {
     sourceTypeChecker.setUrlToCheck(testImageURL);
     return sourceTypeChecker.getSourceType().then(sourceType => {
         expect(sourceType).toEqual(IMAGE_TYPE);
     });
});

it('should resolve video type', () => {
    sourceTypeChecker.setUrlToCheck(testVideoURL);
    return sourceTypeChecker.getSourceType().then(sourceType => {
        expect(sourceType).toEqual(VIDEO_TYPE);
    });
});

it('should resolve youtube type', () => {
    sourceTypeChecker.setUrlToCheck(testYoutubeURL);
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

