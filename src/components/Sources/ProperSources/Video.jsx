import React from 'react';
import PropTypes from "prop-types";

const Video = (
    {
        fsLightbox: {
            elements: { sources },
            sourcesData: { videosPosters },
            data: { urls },
            core: { properSourceController }
        },
        index
    }
) => {
    const onLoadedMetaData = ({ target }) => {
        properSourceController.setIndex(index);
        properSourceController.setSourceWidth(target.videoWidth);
        properSourceController.setSourceHeight(target.videoHeight);
        properSourceController.handleLoad();
    };

    return (
        <video
            onLoadedMetadata={ onLoadedMetaData }
            className="fslightbox-single-source fslightbox-video fslightbox-opacity-0"
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