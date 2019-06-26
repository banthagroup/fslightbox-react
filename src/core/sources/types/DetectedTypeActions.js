import React from 'react';
import { IMAGE_TYPE, INVALID_TYPE, VIDEO_TYPE, YOUTUBE_TYPE } from "../../../constants/core-constants";
import Image from "../../../components/sources/proper-sources/Image.jsx";
import Video from "../../../components/sources/proper-sources/Video.jsx";
import Youtube from "../../../components/sources/proper-sources/Youtube.jsx";
import Invalid from "../../../components/sources/proper-sources/Invalid.jsx";
import { SourceLoadHandler } from "../SourceLoadHandler";

/**
 * @constructor
 */
export function DetectedTypeActions(fsLightbox) {
    const {
        getState: getLightboxState,
        componentsStates: {
            sourcesHoldersUpdatersCollection: sourcesHoldersUpdatersStateCollection
        },
        elements: { sourcesComponents },
        injector: {
            injectDependency
        }
    } = fsLightbox;

    this.runActionsForSourceTypeAndIndex = (type, index) => {
        let BaseSourceComponent;

        if (type !== INVALID_TYPE) {
            fsLightbox.collections.sourcesLoadsHandlers[index] = injectDependency(SourceLoadHandler);
            fsLightbox.collections.sourcesLoadsHandlers[index].setIndex(index);
        }

        switch (type) {
            case IMAGE_TYPE:
                fsLightbox.collections.sourcesLoadsHandlers[index].setUpLoadForImage();
                BaseSourceComponent = Image;
                break;
            case VIDEO_TYPE:
                fsLightbox.collections.sourcesLoadsHandlers[index].setUpLoadForVideo();
                BaseSourceComponent = Video;
                break;
            case YOUTUBE_TYPE:
                fsLightbox.collections.sourcesLoadsHandlers[index].setUpLoadForYoutube();
                BaseSourceComponent = Youtube;
                break;
            default:
                BaseSourceComponent = Invalid;
                break;
        }

        sourcesComponents[index] = <BaseSourceComponent
            fsLightbox={ fsLightbox }
            index={ index }
        />;

        if (getLightboxState().isOpen) {
            sourcesHoldersUpdatersStateCollection[index].set(true);
        }
    };
}
