import React from 'react';
import { IMAGE_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../constants/coreConstants";
import Video from "../../../components/sources/proper-sources/Video.jsx";
import Youtube from "../../../components/sources/proper-sources/Youtube.jsx";
import Invalid from "../../../components/sources/proper-sources/Invalid.jsx";
import Image from "../../../components/sources/proper-sources/Image.jsx";

/**
 * @class
 * @param { FsLightbox } fsLightbox
 */
export function SourceComponentGetter(fsLightbox) {
    let sourceIndex;
    let sourceType;
    let SourceComponentName;
    let sourceComponent;

    this.setSourceIndex = (number) => {
        sourceIndex = number;
    };

    this.setSourceType = (type) => {
        sourceType = type;
    };

    this.getSourceComponent = () => {
        setUpSourceComponent();
        createSourceComponent();
        return sourceComponent;
    };

    const setUpSourceComponent = () => {
        switch (sourceType) {
            case IMAGE_TYPE:
                setSourceComponentToImage();
                break;
            case VIDEO_TYPE:
                setSourceComponentToVideo();
                break;
            case YOUTUBE_TYPE:
                setSourceComponentToYoutube();
                break;
            default:
                setSourceComponentToInvalid();
        }
    };

    const setSourceComponentToImage = () => {
        SourceComponentName = Image;
    };

    const setSourceComponentToVideo = () => {
        SourceComponentName = Video;
    };

    const setSourceComponentToYoutube = () => {
        SourceComponentName = Youtube;
    };

    const setSourceComponentToInvalid = () => {
        SourceComponentName = Invalid;
    };

    const createSourceComponent = () => {
        sourceComponent = <SourceComponentName
            fsLightbox={ fsLightbox }
            index={ sourceIndex }
        />;
    };
}