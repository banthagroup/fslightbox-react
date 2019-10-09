import React from 'react';
import { PREFIX, SOURCE_CLASS_NAME } from "../../../constants/classes-names";

const Video = (
    {
        fsLightbox: {
            props: { videosPosters, sources },
            elements: { sources: sourcesElements },
            collections: { sourcesLoadsHandlers }
        }, i
    }
) => {
    return <video
        onLoadedMetadata={ sourcesLoadsHandlers[i].handleVideoLoad }
        className={ `${ SOURCE_CLASS_NAME } ${ PREFIX }video` }
        controls
        ref={ sourcesElements[i] }
        poster={ videosPosters && videosPosters[i] }>
        <source src={ sources[i] } />
    </video>
};

export default Video;
