import {
    IMAGE_TYPE,
    INVALID_TYPE,
    VIDEO_TYPE,
    YOUTUBE_TYPE,
} from "../../../Constants/CoreConstants";
import { SourceTypeGetterHelpers } from "./SourceTypeGetterHelpers";

/**
 * @class SourceTypeGetter
 */
export function SourceTypeGetter() {
    let url = '';
    let sourceType = null;
    /** @var { XMLHttpRequest} xhr*/
    let xhr = null;
    let resolveAndReturnSourceType = null;

    this.setUrlToCheck = (urlToCheck) => {
        url = urlToCheck;
    };

    /** @return {Promise<any | void>} */
    this.getSourceType = () => {
        return new Promise(((resolve) => {
            resolveAndReturnSourceType = resolve;
            if (SourceTypeGetterHelpers.isUrlYoutubeOne(url)) {
                sourceType = YOUTUBE_TYPE;
                return resolve(sourceType);
            }
            checkSourceTypeUsingXhr();
        })).catch(() => {
            sourceType = INVALID_TYPE;
        });
    };


    const checkSourceTypeUsingXhr = () => {
        xhr = new XMLHttpRequest();
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
        xhr.abort();
        resolveAndReturnSourceType(sourceType);
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