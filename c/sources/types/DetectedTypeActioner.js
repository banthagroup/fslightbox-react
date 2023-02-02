import React from 'react';
import { CUSTOM_TYPE, IMAGE_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../cn/core-constants";
import Image from "../../../cm/sources/proper-sources/Image.jsx";
import Video from "../../../cm/sources/proper-sources/Video.jsx";
import Youtube from "../../../cm/sources/proper-sources/Youtube.jsx";
import Invalid from "../../../cm/sources/proper-sources/Invalid.jsx";
import Custom from "../../../cm/sources/proper-sources/Custom.jsx";

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
