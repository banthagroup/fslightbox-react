import React, { useState } from 'react';
import { SOURCE_INNER_CLASS_NAME } from "../../constants/classes-names";

const SourceAnimationWrapper = (
    {
        fsLightbox: {
            componentsServices: { updateSourceDirectWrapperCollection },
            core: { stageManager: { isSourceInStage } },
            elements: { sourcesComponents, sourceAnimationWrappers },
            props: { loadOnlyCurrentSource },
            stageIndexes: { current }
        }, i
    }
) => {
    const [sourceInnerUpdater, setSourceInnerUpdater] = useState(false);
    updateSourceDirectWrapperCollection[i] = () => {
        setSourceInnerUpdater(!sourceInnerUpdater);
    };

    return (
        <div ref={sourceAnimationWrappers[i]} className={SOURCE_INNER_CLASS_NAME}>
            {
                (i === current || (!loadOnlyCurrentSource && isSourceInStage(i)))
                    ? sourcesComponents[i]
                    : null
            }
        </div>
    );
};

export default SourceAnimationWrapper;
