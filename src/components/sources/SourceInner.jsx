import React, { useState } from 'react';

const SourceInner = (
    {
        fsLightbox: {
            componentsServices: { displaySourceIfNotYetCollection },
            elements: { sourcesComponents, sourcesInners }
        }, i
    }
) => {
    const [sourceInnerUpdater, setSourceInnerUpdater] = useState(false);
    displaySourceIfNotYetCollection[i] = () => {
        if (sourceInnerUpdater !== true) {
            setSourceInnerUpdater(true);
        }
    };

    return (
        <div ref={ sourcesInners[i] }>
            { sourcesComponents[i] }
        </div>
    );
};

export default SourceInner;
