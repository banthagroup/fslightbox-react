import React, { useEffect } from 'react';
import { SOURCE_CLASS_NAME } from "../../../constants/classes-names";

const Custom = (
    {
        fsLightbox: {
            props: { customSources },
            elements: { sources, },
            collections: { sourcesLoadsHandlers }
        }, i
    }
) => {
    useEffect(sourcesLoadsHandlers[i].handleLoad);

    return React.cloneElement(customSources[i], {
        ref: sources[i],
        className: customSources[i].props.className + ` ${ SOURCE_CLASS_NAME }`
    });
};

export default Custom;
