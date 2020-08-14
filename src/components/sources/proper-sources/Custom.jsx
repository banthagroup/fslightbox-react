import React, { useEffect } from 'react';
import { SOURCE_CLASS_NAME } from "../../../constants/classes-names";

const Custom = (
    {
        fsLightbox: {
            collections: { sourcesLoadsHandlers },
            data: { sources },
            elements: { sources: sourcesElements }
        }, i
    }
) => {
    useEffect(sourcesLoadsHandlers[i].handleCustomLoad);

    const baseClassName = sources[i].props.className;

    return React.cloneElement(sources[i], {
        ref: sourcesElements[i],
        className: (baseClassName) ? `${baseClassName} ${SOURCE_CLASS_NAME}` : SOURCE_CLASS_NAME
    });
};

export default Custom;
