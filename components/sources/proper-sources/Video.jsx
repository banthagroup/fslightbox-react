import React from 'react';
import { PREFIX, SOURCE_CLASS_NAME } from "../../../constants/classes-names";

export default (
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
        className={`${SOURCE_CLASS_NAME} ${PREFIX}video`}
        src={sources[i]}
        controls
        onLoadedMetadata={sourceLoadHandlers[i].handleVideoLoad}
        ref={sourcesElements[i]}
        {...(customAttributes && customAttributes[i] ? customAttributes[i] : {})}
    />;
}
