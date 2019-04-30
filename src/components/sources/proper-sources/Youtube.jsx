import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { getYoutubeVideoIdFromUrl } from "../../../helpers/source/getYoutubeVideoIdFromUrl";

/**
 * @param { FsLightbox.data.urls } urls
 * @param { FsLightbox.elements.sources } sources
 * @param { FsLightbox.sourcesData.isSourceAlreadyInitializedArray } isSourceAlreadyInitializedArray
 * @param { FsLightbox.core.sourceController | SetUpSourceController } sourceController
 * @param { number } index
 */
const Youtube = (
    {
        fsLightbox: {
            data: { urls },
            sourcesData: { isSourceAlreadyInitializedArray },
            elements: { sources },
            core: { sourceController }
        },
        index,
    }
) => {
    useEffect(() => {
        sourceController.setIndex(index);
        (isSourceAlreadyInitializedArray[index]) ?
            sourceController.normalLoad() :
            initialLoad();
    });

    const initialLoad = () => {
        sourceController.setSourceWidth(1920);
        sourceController.setSourceHeight(1080);
        sourceController.initialLoad();
    };

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