import React, { useState } from 'react';
import { SOURCE_INNER_CLASS_NAME } from "../../constants/classes-names";

const SourceInner = (
    {
        fsLightbox: {
            componentsServices: { updateSourceInnerCollection },
            core: { stageManager: { isSourceInStage } },
            elements: { sourcesComponents, sourcesInners },
            props: { loadOnlyCurrentSource },
            stageIndexes: { current }
        }, i
    }
) => {
    const [sourceInnerUpdater, setSourceInnerUpdater] = useState(false);
    updateSourceInnerCollection[i] = () => {
        setSourceInnerUpdater(!sourceInnerUpdater);
    };

    return (
        <div ref={sourcesInners[i]} className={SOURCE_INNER_CLASS_NAME}>
            {
                (i === current || (!loadOnlyCurrentSource && isSourceInStage(i)))
                    ? sourcesComponents[i]
                    : null
            }
        </div>
    );
};

export default SourceInner;
