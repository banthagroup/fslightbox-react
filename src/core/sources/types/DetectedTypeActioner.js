import React from 'react';
import { CUSTOM_TYPE, IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../constants/core-constants";
import Image from "../../../components/sources/proper-sources/Image.jsx";
import Video from "../../../components/sources/proper-sources/Video.jsx";
import Youtube from "../../../components/sources/proper-sources/Youtube.jsx";
import Invalid from "../../../components/sources/proper-sources/Invalid.jsx";
import Custom from "../../../components/sources/proper-sources/Custom.jsx";
import { SourceLoadHandler } from "../SourceLoadHandler";

export function DetectedTypeActioner(fsLightbox) {
    const {
        collections: { sourcesLoadsHandlers },
        getState: getLightboxState,
        componentsStates: { sourcesInnersUpdatersCollection: sourcesInnersUpdatersStateCollection },
        elements: { sourcesComponents },
        resolve
    } = fsLightbox;

    this.runActionsForSourceTypeAndIndex = (type, i) => {
        let BaseSourceComponent;

        if (type !== INVALID_TYPE) {
            sourcesLoadsHandlers[i] = resolve(SourceLoadHandler, [i]);
        }

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
            fsLightbox={ fsLightbox }
            i={ i }
        />;

        if (getLightboxState().isOpen) {
            sourcesInnersUpdatersStateCollection[i].set(true);
        }
    };
}
