import React from 'react';
import { CUSTOM_TYPE, IMAGE_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../constants/core-constants";
import Image from "../../../components/sources/proper-sources/Image.jsx";
import Video from "../../../components/sources/proper-sources/Video.jsx";
import Youtube from "../../../components/sources/proper-sources/Youtube.jsx";
import Invalid from "../../../components/sources/proper-sources/Invalid.jsx";
import Custom from "../../../components/sources/proper-sources/Custom.jsx";

export function DetectedTypeActioner(fsLightbox) {
    const {
        componentsServices: { isLightboxOpenManager, updateSourceDirectWrapperCollection },
        elements: { sourcesComponents }
    } = fsLightbox;

    this.runActionsForSourceTypeAndIndex = (type, i) => {
        let BaseSourceComponent;

        switch (type) {
            case IMAGE_TYPE:
                BaseSourceComponent = Image;
                break;
            case VIDEO_TYPE:
                BaseSourceComponent = Video;
                break;
            case YOUTUBE_TYPE:
                BaseSourceComponent = Youtube;
                break;
            case CUSTOM_TYPE:
                BaseSourceComponent = Custom;
                break;
            default:
                BaseSourceComponent = Invalid;
                break;
        }

        sourcesComponents[i] = <BaseSourceComponent
            fsLightbox={fsLightbox}
            i={i}
        />;

        if (isLightboxOpenManager.get()) {
            updateSourceDirectWrapperCollection[i]();
        }
    };
}
