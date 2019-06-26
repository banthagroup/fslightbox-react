import React, { useEffect } from 'react';
import { getYoutubeVideoIdFromUrl } from "../../../helpers/source/getYoutubeVideoIdFromUrl";
import { PREFIX, SOURCE_CLASSES_NAMES } from "../../../constants/classes-names";

const Youtube = (
    {
        fsLightbox: {
            data: { sources },
            elements: { sources: sourcesElements },
            collections: {
                sourcesLoadsHandlers
            }
        },
        index,
    }
) => {
    useEffect(sourcesLoadsHandlers[index].handleLoad);

    return (
        <iframe
            className={ `${ SOURCE_CLASSES_NAMES } ${ PREFIX }youtube-iframe` }
            ref={ sourcesElements[index] }
            src={
                "https://www.youtube.com/embed/"
                + getYoutubeVideoIdFromUrl(sources[index])
                + '?enablejsapi=1'
            }
            allowFullScreen={ true }
        />
    );
};

export default Youtube;
