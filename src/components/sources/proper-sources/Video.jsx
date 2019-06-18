import React from 'react';
import PropTypes from "prop-types";

const Video = (
    {
        fsLightbox: {
            props: { videosPosters },
            data: { sources },
            elements: { sources: sourcesElements },
            collections: { sourcesLoadHandlers }
        },
        index
    }
) => (
    <video
        onLoadedMetadata={ sourcesLoadHandlers[index].handleLoad }
        className="fslightbox-source fslightbox-video fslightbox-opacity-0"
        controls
        ref={ sourcesElements[index] }
        poster={ videosPosters && videosPosters[index] }>
        <source src={ sources[index] }/>
    </video>
);


Video.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};

export default Video;
