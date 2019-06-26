import React, { useState } from 'react';
import SourceLoader from "../loaders/SourceLoader.jsx";

const SourceHolder = (
    {
        fsLightbox: {
            componentsStates: {
                sourcesHoldersUpdatersCollection: sourcesHoldersUpdatersStateCollection
            },
            elements: {
                sourcesComponents,
                sourcesHolders
            },
        },
        index
    }
) => {
    const [currentUpdaterValue, setSourceHolderUpdaterValue] = useState(false);
    sourcesHoldersUpdatersStateCollection[index] = {
        get: () => currentUpdaterValue,
        set: setSourceHolderUpdaterValue
    };

    return (
        <div ref={ sourcesHolders[index] } className="fslightbox-source-holder fslightbox-full-dimension">
            { sourcesComponents[index] ?
                sourcesComponents[index] :
                <SourceLoader/>
            }
        </div>
    );
};

export default SourceHolder;
