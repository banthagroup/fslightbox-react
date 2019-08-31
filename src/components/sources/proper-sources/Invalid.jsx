import React, { useEffect } from 'react';
import { FLEX_CENTERED_CLASS_NAME, PREFIX } from "../../../constants/classes-names";

const Invalid = (
    {
        fsLightbox: {
            componentsStates: { isSourceLoadedCollection },
            data: { initialAnimation },
            elements: { sourcesOuters }
        }, i
    }
) => {
    useEffect(() => {
        isSourceLoadedCollection[i].set(true);
        sourcesOuters[i].current.classList.add(initialAnimation);
    });

    return (
        <div className={ `${ PREFIX }invalid-file-wrapper ${ FLEX_CENTERED_CLASS_NAME }` }>
            Invalid source
        </div>
    );
};

export default Invalid;
