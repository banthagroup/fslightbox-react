import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { getYoutubeVideoIDFromURL } from "../../../utils/SourceType/getYoutubeVideoIDFromURL";

const Youtube = (
    {
        fsLightbox: {
            elements: { sources },
            data: { urls },
            componentsControllers: { properSource: properSourceController }
        },
        index,
    }
) => {
    useEffect(() => {
        properSourceController.setIndex(index);
        properSourceController.setSourceWidth(1920);
        properSourceController.setSourceHeight(1080);
        properSourceController.handleLoad();
    });

    return (
        <iframe
            className="fslightbox-single-source fslightbox-youtube-iframe fslightbox-opacity-0"
            ref={ sources[index] }
            src={
                "https://www.youtube.com/embed/"
                + getYoutubeVideoIDFromURL(urls[index])
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