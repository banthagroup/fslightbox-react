import React from 'react';
import { SOURCE_CLASSES_NAMES } from "../../../constants/classes-names";

const Image = (
    {
        fsLightbox: {
            data: { sources },
            elements: { sources: sourcesElements },
            collections: { sourcesLoadsHandlers }
        },
        index
    }
) => (
    <img
        onLoad={ sourcesLoadsHandlers[index].handleLoad }
        className={ SOURCE_CLASSES_NAMES }
        ref={ sourcesElements[index] }
        src={ sources[index] }
        alt={ sources[index] }
    />
);

export default Image;
