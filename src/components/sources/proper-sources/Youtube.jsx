import React, { useEffect } from 'react';
import { getYoutubeVideoIdFromUrl } from "../../../helpers/source/getYoutubeVideoIdFromUrl";
import { PREFIX, SOURCE_CLASS_NAME } from "../../../constants/classes-names";

const Youtube = (
    {
        fsLightbox: {
            props: { customAttributes, sources },
            elements: { sources: sourcesElements },
            collections: { sourcesLoadsHandlers }
        }, i
    }
) => {
    useEffect(sourcesLoadsHandlers[i].handleYoutubeLoad);

    return (
        <iframe
            ref={sourcesElements[i]}
            className={`${SOURCE_CLASS_NAME} ${PREFIX}youtube-iframe`}
            src={`https://www.youtube.com/embed/${getYoutubeVideoIdFromUrl(sources[i])}`}
            allowFullScreen={true}
            {...(customAttributes && customAttributes[i] ? customAttributes[i] : {})}
        />
    );
};

export default Youtube;
