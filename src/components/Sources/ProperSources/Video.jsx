import React from 'react';
import PropTypes from "prop-types";

/**
 * @param { FsLightbox.data.urls } urls
 * @param { FsLightbox.elements.sources } sources
 * @param { FsLightbox.sourcesData.isSourceAlreadyInitializedArray } isSourceAlreadyInitializedArray
 * @param { FsLightbox.sourcesData.videosPosters } videosPosters
 * @param { FsLightbox.core.properSourceController | ProperSourceController } properSourceController
 * @param { number }index
 */
const Video = (
    {
        fsLightbox: {
            data: { urls },
            elements: { sources },
            sourcesData: { videosPosters, isSourceAlreadyInitializedArray },
            core: { properSourceController }
        },
        index
    }
) => {
    const onLoadedMetaData = ({ target }) => {
        properSourceController.setIndex(index);
        (isSourceAlreadyInitializedArray[index]) ?
            properSourceController.normalLoad() :
            initialLoad(target);
    };

    const initialLoad = (target) => {
        properSourceController.setSourceWidth(target.videoWidth);
        properSourceController.setSourceHeight(target.videoHeight);
        properSourceController.initialLoad();
    };

    return (
        <video
            onLoadedMetadata={ onLoadedMetaData }
            className="fslightbox-source fslightbox-video fslightbox-opacity-0"
            controls
            ref={ sources[index] }
            poster={ videosPosters[index] }>
            <source src={ urls[index] }/>
        </video>
    );
};

Video.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};

export default Video;