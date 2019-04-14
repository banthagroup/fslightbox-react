import React from 'react';
import { IMAGE_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../Constants/CoreConstants";
import Image from "../../../Components/Sources/ProperSources/Image.jsx";
import Video from "../../../Components/Sources/ProperSources/Video.jsx";
import Youtube from "../../../Components/Sources/ProperSources/Youtube.jsx";
import Invalid from "../../../Components/Sources/ProperSources/Invalid.jsx";

/**
 * @class
 */
export function RefactoredSourceComponentGetter(fsLightbox) {
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