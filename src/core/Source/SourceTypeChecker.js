import { IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../constants/CoreConstants";
import { getTypeFromResponseContentType } from "../../utils/SourceType/getTypeFromResponseContentType";

export default class SourceTypeChecker {
    constructor() {
        this._url = '';
        this._sourceType = null;
        this._xhr = null;
        this._resolve = null;

        this._onRequestStateChange = this._onRequestStateChange.bind(this);
    }

    setUrlToCheck(url) {
        this._url = url;
    }

    getSourceType() {
        return new Promise(((resolve) => {
            this._resolve = resolve;
            (this._checkIfYoutubeType()) ?
                this._youtubeType() :
                this._setUpXhr();
        })).catch(() => this._invalidType());
    }

    _checkIfYoutubeType() {
        const parser = document.createElement('a');
        parser.href = this._url;
        return parser.hostname === 'www.youtube.com';
    }


    _setUpXhr() {
        this._xhr = new XMLHttpRequest();
        this._xhr.open('GET', this._url, true);
        this._xhr.onreadystatechange = this._onRequestStateChange;
        this._xhr.send();
    }

    _onRequestStateChange() {
        if (this._xhr.readyState !== 2) {
            return;
        }
        if (this._xhr.status !== 200) {
            this._invalidType();
            this._abortRequestAndResolvePromise();
            return;
        }
        this._callCorrectActionsDependingOnSourceType(
            getTypeFromResponseContentType(
                this._xhr.getResponseHeader('content-type')
            )
        );
        this._abortRequestAndResolvePromise();
    }

    _abortRequestAndResolvePromise() {
        this._xhr.abort();
        this._resolve();
    }

    _callCorrectActionsDependingOnSourceType(type) {
        switch (type) {
            case IMAGE_TYPE:
                this._imageType();
                break;
            case VIDEO_TYPE:
                this._videoType();
                break;
            default:
                this._invalidType();
                break;
        }
    }


    _youtubeType() {
        this._sourceType = YOUTUBE_TYPE;
        this._resolve();
    }

    _imageType() {
        this._sourceType = IMAGE_TYPE;
    }

    _videoType() {
        this._sourceType = VIDEO_TYPE;
    }

    _invalidType() {
        this._sourceType = INVALID_TYPE;
    }
}