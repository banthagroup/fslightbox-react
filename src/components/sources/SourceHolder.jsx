import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SourceLoader from "../loaders/SourceLoader.jsx";

const SourceHolder = (
    {
        fsLightbox: {
            componentsStates: {
                shouldSourceHolderBeUpdatedCollection: shouldSourceHolderBeUpdatedStateCollection
            },
            elements: {
                sourcesComponents,
                sourceHolders
            },
        },
        index
    }
) => {
    const [shouldBeUpdated, setShouldBeUpdated] = useState(false);
    shouldSourceHolderBeUpdatedStateCollection[index] = {
        get: () => shouldBeUpdated,
        set: setShouldBeUpdated
    };

    return (
        <div ref={ sourceHolders[index] } className="fslightbox-source-holder fslightbox-full-dimension">
            { sourcesComponents[index] ?
                sourcesComponents[index] :
                <SourceLoader/>
            }
        </div>
    );
};

SourceHolder.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};

export default SourceHolder;
