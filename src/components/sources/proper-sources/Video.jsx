import React from 'react';
import PropTypes from "prop-types";

/**
 * @param { FsLightbox.data.urls } urls
 * @param { FsLightbox.elements.sources } sources
 * @param { FsLightbox.sourcesData.isSourceAlreadyInitializedArray } isSourceAlreadyInitializedArray
 * @param { FsLightbox.sourcesData.videosPosters } videosPosters
 * @param { FsLightbox.core.sourceController | SetUpSourceController } sourceController
 * @param { number }index
 */
const Video = (
    {
        fsLightbox: {
            data: { urls },
            elements: { sources },
            sourcesData: { videosPosters, isSourceAlreadyInitializedArray },
            core: { sourceController }
        },
        index
    }
) => {
    const onLoadedMetaData = ({ target }) => {
        sourceController.setIndex(index);
        (isSourceAlreadyInitializedArray[index]) ?
            sourceController.normalLoad() :
            initialLoad(target);
    };

    const initialLoad = (target) => {
        sourceController.setSourceWidth(target.videoWidth);
        sourceController.setSourceHeight(target.videoHeight);
        sourceController.initialLoad();
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