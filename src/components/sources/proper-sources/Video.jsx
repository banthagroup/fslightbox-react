import React from 'react';
import { PREFIX, SOURCE_CLASS_NAME } from "../../../constants/classes-names";

const Video = (
    {
        fsLightbox: {
            collections: { sourceLoadHandlers },
            elements: { sources: sourcesElements },
            props: { customAttributes, sources },
            timeout
        }, i
    }
) => {
    timeout(sourceLoadHandlers[i].handleNotMetaDatedVideoLoad, 3000);

    return <video
        onLoadedMetadata={sourceLoadHandlers[i].handleVideoLoad}
        className={`${SOURCE_CLASS_NAME} ${PREFIX}video`}
        controls
        ref={sourcesElements[i]}
        {...(customAttributes && customAttributes[i] ? customAttributes[i] : {})}>
        <source src={sources[i]} />
    </video>
};

export default Video;
