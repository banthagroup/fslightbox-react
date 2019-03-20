import {
    IMAGE_TYPE,
    INVALID_TYPE,
    VIDEO_TYPE,
    YOUTUBE_TYPE,
} from "../../../constants/CoreConstants";
import { getTypeFromResponseContentType } from "../../../utils/SourceType/getTypeFromResponseContentType";
import { SourceTypeCheckerUtils } from "./SourceTypeCheckerUtils";

/**
 * @class SourceTypeChecker
 */
export function SourceTypeChecker() {
    let url = '';
    let sourceType = null;
    /** @type XMLHttpRequest */
    let xhr = null;
    let resolveAndReturnSourceType = null;
    const sourceTypeUtils = new SourceTypeCheckerUtils();

    this.setUrlToCheck = (urlToCheck) => {
        url = urlToCheck;
    };

    this.getSourceType = () => {
        return new Promise(((resolve) => {
            resolveAndReturnSourceType = resolve;
            (sourceTypeUtils.isUrlYoutubeOne(url)) ?
                youtubeType() :
                setUpXhr();
        })).catch(() => invalidType());
    };


    const setUpXhr = () => {
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
            sourceTypeUtils, getTypeFromResponseContentType(
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
        resolveAndReturnSourceType(sourceType);
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