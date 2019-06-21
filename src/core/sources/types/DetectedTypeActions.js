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
            shouldSourceHolderBeUpdatedCollection: shouldSourceHolderBeUpdatedStateCollection
        },
        elements: { sourcesComponents },
        injector: {
            injectDependency
        }
    } = fsLightbox;

    let sourceIndex;
    let sourceType;
    let BaseSourceComponent;

    this.runActionsForSourceTypeAndIndex = (type, index) => {
        sourceIndex = index;
        sourceType = type;
        runNotInvalidSourceActions();
        runTypeSpecificActions();
        buildSourceComponent();
        updateSourceHolderIfLightboxIsOpen();
    };

    const runTypeSpecificActions = () => {
        switch (sourceType) {
            case IMAGE_TYPE:
                runImageTypeActions();
                break;
            case VIDEO_TYPE:
                runVideoTypeActions();
                break;
            case YOUTUBE_TYPE:
                runYoutubeTypeActions();
                break;
            default:
                runInvalidTypeActions();
                break;
        }
    };

    const runNotInvalidSourceActions = () => {
        if (sourceType !== INVALID_TYPE) {
            fsLightbox.collections.sourcesLoadHandlers[sourceIndex] = injectDependency(SourceLoadHandler);
            fsLightbox.collections.sourcesLoadHandlers[sourceIndex].setIndex(sourceIndex);
        }
    };

    const runImageTypeActions = () => {
        fsLightbox.collections.sourcesLoadHandlers[sourceIndex].setUpLoadForImage();
        BaseSourceComponent = Image;
    };

    const runVideoTypeActions = () => {
        fsLightbox.collections.sourcesLoadHandlers[sourceIndex].setUpLoadForVideo();
        BaseSourceComponent = Video;
    };

    const runYoutubeTypeActions = () => {
        fsLightbox.collections.sourcesLoadHandlers[sourceIndex].setUpLoadForYoutube();
        BaseSourceComponent = Youtube;
    };

    const runInvalidTypeActions = () => {
        BaseSourceComponent = Invalid;
    };

    const buildSourceComponent = () => {
        sourcesComponents[sourceIndex] = <BaseSourceComponent
            fsLightbox={ fsLightbox }
            index={ sourceIndex }
        />;
    };

    const updateSourceHolderIfLightboxIsOpen = () => {
        if (getLightboxState().isOpen) {
            shouldSourceHolderBeUpdatedStateCollection[sourceIndex].set(true);
        }
    };
}
