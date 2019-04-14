import { SourceTypeCheckerUtils } from "../../../../../src/core/Sources/Creating/SourceTypeGetterHelpers";
import { testYoutubeURL } from "../../../../schemas/testVariables";

const sourceTypeCheckerUtils = new SourceTypeCheckerUtils();

describe('checking if url is valid youtube url', () => {
   it('should not return false because url is not youtube one', () => {
        expect(sourceTypeCheckerUtils.isUrlYoutubeOne('ww.youtube.com')).toBeFalsy();
   });

    it('should not return true because url is youtube one', () => {
        expect(sourceTypeCheckerUtils.isUrlYoutubeOne(testYoutubeURL)).toBeTruthy();
    });
});

describe('getting response content type from response type', () => {
    it('should return correct response type', () => {
        expect(sourceTypeCheckerUtils.getTypeFromResponseContentType('image/gif'))
            .toEqual('image');
    });
});
