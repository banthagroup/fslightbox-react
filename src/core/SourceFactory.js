import React from 'react';
import { IMAGE_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../constants/CoreConstants";

export class SourceFactory {
    constructor(fsLightbox) {
        this.fsLightbox = fsLightbox;
        this.index = null;
        this.source = <div>XD</div>;
    }

    setSourceIndex(index) {
        this.index = index;
    }

    createSource() {
        switch (this.index) {
            case IMAGE_TYPE:
                return this.createImageSource();
            case VIDEO_TYPE:
                this.createVideoSource();
                break;
            case YOUTUBE_TYPE:
                this.createYoutubeSource();
                break;
            default:
                this.createInvalidSource();
                break;
        }
    }

    createImageSource() {

    }

    createVideoSource() {

    }

    createYoutubeSource() {

    }

    createInvalidSource() {

    }


    getSource() {
        return this.source;
    }
}