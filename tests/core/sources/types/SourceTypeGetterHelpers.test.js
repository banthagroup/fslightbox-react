import { SourceTypeGetterHelpers } from "../../../../src/core/sources/types/SourceTypeGetterHelpers";
import { TEST_YOUTUBE_URL } from "../../../__tests-helpers__/testVariables";

describe('checking if url is valid youtube url', () => {
    it('should not return false because url is not youtube one', () => {
        expect(SourceTypeGetterHelpers.isUrlYoutubeOne('ww.youtube.com')).toBeFalsy();
    });

    it('should not return true because url is youtube one', () => {
        expect(SourceTypeGetterHelpers.isUrlYoutubeOne(TEST_YOUTUBE_URL)).toBeTruthy();
    });
});

describe('getting response content type from response type', () => {
    it('should return correct response type', () => {
        expect(SourceTypeGetterHelpers.getTypeFromResponseContentType('image/gif'))
            .toEqual('image');
    });
});
