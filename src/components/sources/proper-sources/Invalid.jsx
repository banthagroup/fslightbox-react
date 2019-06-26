import React, { useEffect } from 'react';
import {
    FADE_IN_CLASS_NAME,
    FLEX_CENTERED_CLASS_NAME,
    PREFIX
} from "../../../constants/classes-names";

const Invalid = (
    {
        fsLightbox: {
            elements: {
                sources
            }
        },
        index
    }
) => {
    useEffect(() => {
        sources[index].current.classList.add(FADE_IN_CLASS_NAME);
    });

    return (
        <div
            className={ `${ PREFIX }invalid-file-wrapper ${ FLEX_CENTERED_CLASS_NAME }` }
            ref={ sources[index] }>
            Invalid file
        </div>
    );
};

export default Invalid;
