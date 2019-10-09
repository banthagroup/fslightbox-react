import React from 'react';
import { SOURCE_CLASS_NAME } from "../../../constants/classes-names";

const Image = (
    {
        fsLightbox: {
            props: { sources },
            elements: { sources: sourcesElements },
            collections: { sourcesLoadsHandlers }
        }, i
    }
) => (
    <img
        onLoad={ sourcesLoadsHandlers[i].handleImageLoad }
        className={ SOURCE_CLASS_NAME }
        ref={ sourcesElements[i] }
        src={ sources[i] }
        alt={ sources[i] }
    />
);

export default Image;
