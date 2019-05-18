import {
    IMAGE_TYPE,
    INVALID_TYPE,
    VIDEO_TYPE,
    YOUTUBE_TYPE,
} from "../../../constants/coreConstants";
import { SourceTypeGetterHelpers } from "./SourceTypeGetterHelpers";

/**
 * @constructor
 */
export function SourceTypeGetter(
    {
        collections: { xhrs },
        injector: {
            injectDependency
        }
    }
) {
    let url = '';
    let sourceType = null;
    let callbackSourceType = null;
    let xhr;
    let isResolved = false;

    this.setUrlToCheck = (urlToCheck) => {
        url = urlToCheck;
    };

    /**
     * Asynchronous method takes callback which will be called after source type is received with source type as param.
     * @param { Function } callback
     */
    this.getSourceType = (callback) => {
        if (SourceTypeGetterHelpers.isUrlYoutubeOne(url)) {
            sourceType = YOUTUBE_TYPE;
            return callback(sourceType);
        }
        callbackSourceType = callback;
        checkSourceTypeUsingXhr();
    };

    const checkSourceTypeUsingXhr = () => {
        xhr = injectDependency(XMLHttpRequest);
        xhrs.push(xhr);
        xhr.open('GET', url, true);
        xhr.onreadystatechange = onRequestStateChange;
        xhr.send();
    };

    const onRequestStateChange = () => {
        // we need to use isResolved helper because logic after readyState 2 is complex enough that readyState 4 is called
        // before request is aborted
        if (xhr.readyState === 4 && xhr.status === 0 && !isResolved) {
            resolveInvalidType();
            return;
        }
        if (xhr.readyState !== 2) {
            return;
        }
        if (xhr.status !== 200 && xhr.status !== 206) {
            // we are setting isResolved to true so readyState 4 won't be called before forwarding logic
            isResolved = true;
            resolveInvalidType();
            return;
        }
        // we are setting isResolved to true so readyState 4 won't be called before forwarding logic
        isResolved = true;
        setSourceTypeDependingOnResponseContentType(
            SourceTypeGetterHelpers.getTypeFromResponseContentType(
                xhr.getResponseHeader('content-type')
            )
        );
        abortRequestAndResolvePromise();
    };

    const resolveInvalidType = () => {
        sourceType = INVALID_TYPE;
        abortRequestAndResolvePromise();
    };

    const abortRequestAndResolvePromise = () => {
        xhr.abort();
        callbackSourceType(sourceType);
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