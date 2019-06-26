import React from 'react';
import { PREFIX, SOURCE_CLASSES_NAMES } from "../../../constants/classes-names";

const Video = (
    {
        fsLightbox: {
            props: { videosPosters },
            data: { sources },
            elements: { sources: sourcesElements },
            collections: { sourcesLoadsHandlers }
        },
        index
    }
) => {
    return <video
        onLoadedMetadata={ sourcesLoadsHandlers[index].handleLoad }
        className={ `${ SOURCE_CLASSES_NAMES } ${ PREFIX }video` }
        controls
        ref={ sourcesElements[index] }
        poster={ videosPosters && videosPosters[index] }>
        <source src={ sources[index] }/>
    </video>
};

export default Video;
