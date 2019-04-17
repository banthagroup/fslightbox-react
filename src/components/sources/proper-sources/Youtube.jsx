import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { getYoutubeVideoIDFromURL } from "../../../helpers/source-type/getYoutubeVideoIDFromURL";


/**
 * @param { FsLightbox.data.urls } urls
 * @param { FsLightbox.elements.sources } sources
 * @param { FsLightbox.sourcesData.isSourceAlreadyInitializedArray } isSourceAlreadyInitializedArray
 * @param { FsLightbox.core.properSourceController | ProperSourceController } properSourceController
 * @param { number } index
 */
const Youtube = (
    {
        fsLightbox: {
            data: { urls },
            sourcesData: { isSourceAlreadyInitializedArray },
            elements: { sources },
            core: { properSourceController }
        },
        index,
    }
) => {
    useEffect(() => {
        properSourceController.setIndex(index);
        (isSourceAlreadyInitializedArray[index]) ?
            properSourceController.normalLoad() :
            initialLoad();
    });

    const initialLoad = () => {
        properSourceController.setSourceWidth(1920);
        properSourceController.setSourceHeight(1080);
        properSourceController.initialLoad();
    };

    return (
        <iframe
            className="fslightbox-source fslightbox-youtube-iframe fslightbox-opacity-0"
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