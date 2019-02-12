import { IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../constants/CoreConstants";
import { getTypeFromResponseContentType } from "../../utils/SourceType/getTypeFromResponseContentType";

export default class SourceTypeChecker {
    constructor() {
        this.url = '';
        this.sourceType = null;
        this.xhr = new XMLHttpRequest();
        this.resolve = null;

        this.onRequestStateChange = this.onRequestStateChange.bind(this);
    }

    setUrlToCheck(url) {
        this.url = url;
    }

    getSourceType() {
        return new Promise(((resolve) => {
            this.resolve = resolve;
            (this.checkIfYoutubeType()) ?
                this.youtubeType() :
                this.setXHR();
        })).catch(() => this.invalidType());
    }

    checkIfYoutubeType() {
        const parser = document.createElement('a');
        parser.href = this.url;
        return parser.hostname === 'www.youtube.com';
    }


    setXHR() {
        this.xhr.open('GET', this.url, true);
        this.xhr.onreadystatechange = this.onRequestStateChange;
        this.xhr.send();
    }

    onRequestStateChange() {
        if (this.xhr.readyState !== 2) {
            return;
        }
        this.callCorrectActionsDependingOnSourceType(
            getTypeFromResponseContentType(
                this.xhr.getResponseHeader('content-type')
            )
        );
        this.resolve();
        this.xhr.abort();
    }

    callCorrectActionsDependingOnSourceType(type) {
        switch (type) {
            case IMAGE_TYPE:
                this.imageType();
                break;
            case VIDEO_TYPE:
                this.videoType();
                break;
            default:
                this.invalidType();
                break;
        }
    }


    youtubeType() {
        this.sourceType = YOUTUBE_TYPE;
        this.resolve();
    }

    imageType() {
        this.sourceType = IMAGE_TYPE;
    }

    videoType() {
        this.sourceType = VIDEO_TYPE;
    }

    invalidType() {
        this.sourceType = INVALID_TYPE;
    }
}