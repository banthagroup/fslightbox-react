import React from 'react';
import PropTypes from "prop-types";

const Video = (
    {
        fsLightbox: {
            elements: { sources },
            sourcesData: { videosPosters },
            data: { urls },
            componentsControllers: { sources: { properSources } }
        },
        i,
        onFirstSourceLoad
    }
) => {
    const onLoadedMetaData = ({ target }) => {
        properSources.setIndex(i);
        properSources.setOnFirstSourceLoad(onFirstSourceLoad);
        properSources.setSourceWidth(target.videoWidth);
        properSources.setSourceHeight(target.videoHeight);
        properSources.handleLoad();
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
    i: PropTypes.number.isRequired,
    onFirstSourceLoad: PropTypes.func.isRequired,
};
export default Video;