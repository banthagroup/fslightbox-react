import React from 'react';
import { IMAGE_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../constants/CoreConstants";
import Video from "../../components/sources/properSources/Video.jsx";
import Youtube from "../../components/sources/properSources/Youtube.jsx";
import Invalid from "../../components/sources/properSources/Invalid.jsx";
import Image from "../../components/sources/properSources/Image.jsx";

let SourceComponent;

export class SourceFactory {
    /** @param fsLightbox { FsLightbox } */
    constructor(fsLightbox) {
        this.fsLightbox = fsLightbox;
        this.onFirstSourceLoad = null;
        this.i = null;
        SourceComponent = null;
    }

    attachOnFirstSourceLoad(onFirstSourceLoad) {
        this.onFirstSourceLoad = onFirstSourceLoad;
    }

    createSourceForIndex(i) {
        this.i = i;
        switch (this.fsLightbox.sourcesTypes[i]) {
            case IMAGE_TYPE:
                this.createImageSource();
                break;
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

    getSource() {
        return <SourceComponent
            _={ this.fsLightbox }
            i={ this.i }
            onFirstSourceLoad={ this.onFirstSourceLoad }
        />;
    }

    /** @private */
    createImageSource() {
        SourceComponent = Image;
    }

    /** @private */
    createVideoSource() {
        SourceComponent = Video;
    }

    /** @private */
    createYoutubeSource() {
        SourceComponent = Youtube;
    }

    /** @private */
    createInvalidSource() {
        SourceComponent = Invalid;
    }
}