import {
    IMAGE_TYPE,
    INVALID_TYPE,
    VIDEO_TYPE,
    YOUTUBE_TYPE,
} from "../../../constants/CoreConstants";
import { sourceTypeGetterHelpers } from "./SourceTypeGetterHelpers";

/**
 * @class SourceTypeGetter
 */
export function SourceTypeGetter() {
    let url = '';
    let sourceType = null;
    /** @type XMLHttpRequest */
    let xhr = null;
    let resolveAndReturnSourceType = null;

    this.setUrlToCheck = (urlToCheck) => {
        url = urlToCheck;
    };

    /**
     * @return {Promise<any | void>}
     */
    this.getSourceType = () => {
        return new Promise(((resolve) => {
            resolveAndReturnSourceType = resolve;
            if (sourceTypeGetterHelpers.isUrlYoutubeOne(url)) {
                youtubeType();
                return resolve(sourceType);
            }
            checkSourceTypeUsingXhr();
        })).catch(() => invalidType());
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
            invalidType();
            abortRequestAndResolvePromise();
            return;
        }
        callCorrectActionsDependingOnSourceType(
            sourceTypeGetterHelpers.getTypeFromResponseContentType(
                xhr.getResponseHeader('content-type')
            )
        );
        abortRequestAndResolvePromise();
    };

    const abortRequestAndResolvePromise = () => {
        xhr.abort();
        resolveAndReturnSourceType(sourceType);
    };

    const callCorrectActionsDependingOnSourceType = (type) => {
        switch (type) {
            case IMAGE_TYPE:
                imageType();
                break;
            case VIDEO_TYPE:
                videoType();
                break;
            default:
                invalidType();
                break;
        }
    };


    const youtubeType = () => {
        sourceType = YOUTUBE_TYPE;
    };

    const imageType = () => {
        sourceType = IMAGE_TYPE;
    };

    const videoType = () => {
        sourceType = VIDEO_TYPE;
    };

    const invalidType = () => {
        sourceType = INVALID_TYPE;
    };
}