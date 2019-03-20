/**
 * @class SourceTypeCheckerUtils
 */
export function SourceTypeCheckerUtils() {
    this.isUrlYoutubeOne = (url) => {
        const parser = document.createElement('a');
        parser.href = url;
        return parser.hostname === 'www.youtube.com';
    };

    this.getTypeFromResponseContentType = (responseContentType) => {
        return responseContentType.slice(0, responseContentType.indexOf('/'));
    };
}