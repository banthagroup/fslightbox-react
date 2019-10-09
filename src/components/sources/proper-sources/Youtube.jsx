import React, { useEffect } from 'react';
import { getYoutubeVideoIdFromUrl } from "../../../helpers/source/getYoutubeVideoIdFromUrl";
import { PREFIX, SOURCE_CLASS_NAME } from "../../../constants/classes-names";

const Youtube = (
    {
        fsLightbox: {
            props: { sources },
            elements: { sources: sourcesElements },
            collections: { sourcesLoadsHandlers }
        }, i
    }
) => {
    useEffect(sourcesLoadsHandlers[i].handleYoutubeLoad);

    return (
        <iframe
            className={ `${ SOURCE_CLASS_NAME } ${ PREFIX }youtube-iframe` }
            ref={ sourcesElements[i] }
            src={ `https://www.youtube.com/embed/${ getYoutubeVideoIdFromUrl(sources[i]) }` }
            allowFullScreen={ true }
        />
    );
};

export default Youtube;
