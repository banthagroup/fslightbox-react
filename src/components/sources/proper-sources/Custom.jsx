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
    useEffect(sourcesLoadsHandlers[i].handleCustomLoad);

    const baseClassName = customSources[i].props.className;

    return React.cloneElement(customSources[i], {
        ref: sources[i],
        className: (baseClassName) ? `${ baseClassName } ${ SOURCE_CLASS_NAME }` : SOURCE_CLASS_NAME
    });
};

export default Custom;
