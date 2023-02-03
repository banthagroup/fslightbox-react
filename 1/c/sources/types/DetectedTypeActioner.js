import React from 'react';
import { CUSTOM_TYPE, IMAGE_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../cn/core-constants";
import Image from "../../../cm/Image.jsx";
import Video from "../../../cm/Video.jsx";
import Youtube from "../../../cm/Youtube.jsx";
import Invalid from "../../../cm/Invalid.jsx";
import Custom from "../../../cm/Custom.jsx";

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
