import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { getYoutubeVideoIDFromURL } from "../../../utils/SourceType/getYoutubeVideoIDFromURL";

const Youtube = (
    {
        fsLightbox: {
            elements: { sources },
            data: { urls },
            componentsControllers: { properSource }
        },
        i,
    }
) => {
    useEffect(() => {
        properSource.setIndex(i);
        properSource.setSourceWidth(1920);
        properSource.setSourceHeight(1080);
        properSource.handleLoad();
    });

    return (
        <iframe
            className="fslightbox-single-source fslightbox-youtube-iframe fslightbox-opacity-0"
            ref={ sources[i] }
            src={
                "https://www.youtube.com/embed/"
                + getYoutubeVideoIDFromURL(urls[i])
                + '?enablejsapi=1'
            }
            allowFullScreen={ true }
        />
    );
};

Youtube.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired
};
export default Youtube;