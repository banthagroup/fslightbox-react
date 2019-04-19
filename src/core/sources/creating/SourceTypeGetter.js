import {
    IMAGE_TYPE,
    INVALID_TYPE,
    VIDEO_TYPE,
    YOUTUBE_TYPE,
} from "../../../constants/coreConstants";
import { SourceTypeGetterHelpers } from "./SourceTypeGetterHelpers";

/**
 * @class SourceTypeGetter
 */
export function SourceTypeGetter({ collections: { xhrs } }) {
    let url = '';
    let sourceType = null;
    let callbackSourceType = null;
    let xhr;

    this.setUrlToCheck = (urlToCheck) => {
        url = urlToCheck;
    };

    /** @return {Promise<any | void>} */
    this.getSourceType = (callback) => {
        callbackSourceType = callback;
        if (SourceTypeGetterHelpers.isUrlYoutubeOne(url)) {
            sourceType = YOUTUBE_TYPE;
            return callback(sourceType);
        }
        checkSourceTypeUsingXhr();
    };


    const checkSourceTypeUsingXhr = () => {
        xhr = new XMLHttpRequest();
        xhrs.push(xhr);
        xhr.open('GET', url, true);
        xhr.onreadystatechange = onRequestStateChange;
        xhr.send();
    };

    const onRequestStateChange = () => {
        if (xhr.readyState !== 2) {
            return;
        }
        if (xhr.status !== 200) {
            sourceType = INVALID_TYPE;
            abortRequestAndResolvePromise();
            return;
        }
        setSourceTypeDependingOnResponseContentType(
            SourceTypeGetterHelpers.getTypeFromResponseContentType(
                xhr.getResponseHeader('content-type')
            )
        );
        abortRequestAndResolvePromise();
    };

    const abortRequestAndResolvePromise = () => {
        setTimeout(() => {
            xhr.abort();
            callbackSourceType(sourceType);
        }, 1000);
    };

    const setSourceTypeDependingOnResponseContentType = (type) => {
        switch (type) {
            case IMAGE_TYPE:
                sourceType = IMAGE_TYPE;
                break;
            case VIDEO_TYPE:
                sourceType = VIDEO_TYPE;
                break;
            default:
                sourceType = INVALID_TYPE;
        }
    };
}