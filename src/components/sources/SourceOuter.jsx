import React, { useState } from 'react';
import { SOURCE_INNER_CLASS_NAME } from "../../constants/classes-names";
import Loader from "../Loader.jsx";

const SourceOuter = (
    {
        fsLightbox: {
            componentsStates: { isSourceLoadedCollection },
            elements: { sourcesComponents, sourcesOuters }
        }, i
    }
) => {
    const [sourceInnerUpdater, setSourceOuterUpdater] = useState(false);
    isSourceLoadedCollection[i] = { get: () => sourceInnerUpdater, set: setSourceOuterUpdater };

    return (
        <div ref={ sourcesOuters[i] } className={ SOURCE_INNER_CLASS_NAME }>
            { sourcesComponents[i] ? sourcesComponents[i] : <Loader /> }
        </div>
    );
};

export default SourceOuter;
