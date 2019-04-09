import React from 'react';
import PropTypes from "prop-types";

const Video = (
    {
        fsLightbox: {
            elements: { sources },
            sourcesData: { videosPosters },
            data: { urls },
            componentsControllers: { properSource }
        },
        i
    }
) => {
    const onLoadedMetaData = ({ target }) => {
        properSource.setIndex(i);
        properSource.setSourceWidth(target.videoWidth);
        properSource.setSourceHeight(target.videoHeight);
        properSource.handleLoad();
    };

    return (
        <video
            onLoadedMetadata={ onLoadedMetaData }
            className="fslightbox-single-source fslightbox-video fslightbox-opacity-0"
            controls
            ref={ sources[i] }
            poster={ videosPosters[i] }>
            <source src={ urls[i] }/>
        </video>
    );
};

Video.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired
};

export default Video;