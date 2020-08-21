import React from 'react';
import { PREFIX, SOURCE_CLASS_NAME } from "../../../constants/classes-names";

const Video = (
    {
        fsLightbox: {
            collections: { sourcesLoadsHandlers },
            data: { sources },
            elements: { sources: sourcesElements },
            props: { customAttributes, videosPosters }
        }, i
    }
) => {
    setTimeout(sourcesLoadsHandlers[i].handleNotMetaDatedVideoLoad, 3000);

    const attributes = (customAttributes && customAttributes[i]) ? customAttributes[i] : {}
    if (videosPosters && videosPosters[i]) {
        attributes['poster'] = videosPosters[i]
    }

    return <video
        onLoadedMetadata={sourcesLoadsHandlers[i].handleVideoLoad}
        className={`${SOURCE_CLASS_NAME} ${PREFIX}video`}
        controls
        ref={sourcesElements[i]}
        {...attributes}>
        <source src={sources[i]} />
    </video>
};

export default Video;
