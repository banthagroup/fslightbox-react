import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { getYoutubeVideoIdFromUrl } from "../../../helpers/source/getYoutubeVideoIdFromUrl";

const Youtube = (
    {
        fsLightbox: {
            data: { urls },
            elements: { sources },
            collections: {
                sourcesLoadHandlers
            }
        },
        index,
    }
) => {
    useEffect(sourcesLoadHandlers[index].handleLoad);

    return (
        <iframe
            className="fslightbox-source fslightbox-youtube-iframe fslightbox-opacity-0"
            ref={ sources[index] }
            src={
                "https://www.youtube.com/embed/"
                + getYoutubeVideoIdFromUrl(urls[index])
                + '?enablejsapi=1'
            }
            allowFullScreen={ true }
        />
    );
};

Youtube.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};

export default Youtube;
