import React, { useEffect } from 'react';
import { FADE_IN_STRONG_CLASS_NAME, FLEX_CENTERED_CLASS_NAME, PREFIX } from "../../../constants/classes-names";

const Invalid = (
    {
        fsLightbox: {
            componentsServices: { isSourceLoadedCollection },
            elements: { sourcesOuters }
        }, i
    }
) => {
    useEffect(() => {
        isSourceLoadedCollection[i].set(true);
        sourcesOuters[i].current.classList.add(FADE_IN_STRONG_CLASS_NAME);
    });

    return (
        <div className={ `${ PREFIX }invalid-file-wrapper ${ FLEX_CENTERED_CLASS_NAME }` }>
            Invalid source
        </div>
    );
};

export default Invalid;
