import React from 'react';
import { IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../constants/CoreConstants";
import Video from "../../components/Sources/ProperSources/Video.jsx";
import Youtube from "../../components/Sources/ProperSources/Youtube.jsx";
import Invalid from "../../components/Sources/ProperSources/Invalid.jsx";
import Image from "../../components/Sources/ProperSources/Image.jsx";


/**
 * @param { FsLightbox.sourcesData } sourcesData
 * @param { FsLightbox.data } data
 * @param { FsLightbox.elements } elements
 * @class
 */
export function SourceFactory({ sourcesData, data, elements }) {
    let ProperSourceComponentName;
    let SourceComponent;
    let sourceIndex;
    let onFirstSourceLoad;

    this.attachOnFirstSourceLoad = (func) => {
        onFirstSourceLoad = func;
    };

    this.setSourceIndex = (i) => {
        sourceIndex = i;
    };

    this.getSourceComponent = () => {
        createCorrectSourceByItsType();
        return SourceComponent;
    };

    const createCorrectSourceByItsType = () => {
        if (sourcesData.sourcesTypes[sourceIndex] === INVALID_TYPE) {
            createInvalidSource();
            return;
        }
        setUpProperSourceComponent();
        createProperSourceComponent();
    };

    const createInvalidSource = () => {
        SourceComponent = <Invalid
            sources={ elements.sources }
            sourcesData={ sourcesData }
            i={ sourceIndex }
        />;
    };

    const setUpProperSourceComponent = () => {
        switch (sourcesData.sourcesTypes[sourceIndex]) {
            case IMAGE_TYPE:
                setUpSourceComponentToImage();
                break;
            case VIDEO_TYPE:
                setUpSourceComponentToVideo();
                break;
            case YOUTUBE_TYPE:
                setUpSourceComponentToYoutube();
        }
    };

    const setUpSourceComponentToImage = () => {
        ProperSourceComponentName = Image;
    };

    const setUpSourceComponentToVideo = () => {
        ProperSourceComponentName = Video;
    };

    const setUpSourceComponentToYoutube = () => {
        ProperSourceComponentName = Youtube;
    };

    const createProperSourceComponent = () => {
        SourceComponent = <ProperSourceComponentName
            urls={ data.urls }
            sources={ elements.sources }
            sourcesData={ sourcesData }
            i={ sourceIndex }
            onFirstSourceLoad={ onFirstSourceLoad }
        />;
    };
}