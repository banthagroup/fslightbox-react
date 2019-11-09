import React, { useState } from 'react';

const SourceInner = (
    {
        fsLightbox: {
            componentsServices: { updateSourceInnerCollection },
            core: { stageManager: { isSourceInStage } },
            elements: { sourcesComponents, sourcesInners }
        }, i
    }
) => {
    const [sourceInnerUpdater, setSourceInnerUpdater] = useState(false);
    updateSourceInnerCollection[i] = () => {
        setSourceInnerUpdater(!sourceInnerUpdater);
    };

    return (
        <div ref={ sourcesInners[i] }>
            { isSourceInStage(i) && sourcesComponents[i] }
        </div>
    );
};

export default SourceInner;
