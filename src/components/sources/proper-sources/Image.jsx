import React from 'react';
import { SOURCE_CLASS_NAME } from "../../../constants/classes-names";

export default (
    {
        fsLightbox: {
            collections: { sourceLoadHandlers },
            elements: { sources: sourcesElements },
            props: { customAttributes, sources }
        }, i
    }
) => (
    <img
        className={SOURCE_CLASS_NAME}
        onLoad={sourceLoadHandlers[i].handleImageLoad}
        ref={sourcesElements[i]}
        src={sources[i]}
        {...(customAttributes && customAttributes[i] ? customAttributes[i] : {})}
    />
);
