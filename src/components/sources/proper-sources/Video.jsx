import React from 'react';
import PropTypes from "prop-types";

const Video = (
    {
        fsLightbox: {
            data: { urls },
            elements: { sources },
            sourcesData: { videosPosters },
            collections: { sourcesLoadHandlers }
        },
        index
    }
) => {
    return (
        <video
            onLoadedMetadata={ sourcesLoadHandlers[index].handleLoad }
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
