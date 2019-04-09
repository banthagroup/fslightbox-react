import React from 'react';
import PropTypes from "prop-types";

const Invalid = (
    {
        fsLightbox: {
            sourcesData: { isSourceAlreadyLoadedArray },
            elements: { sources }
        },
        index
    }
) => {
    if (!isSourceAlreadyLoadedArray[index]) {
        isSourceAlreadyLoadedArray[index] = true;
    }

    return (
        <div
            className="fslightbox-invalid-file-wrapper fslightbox-flex-centered"
            ref={ sources[index] }>
            Invalid file
        </div>
    );
};

Invalid.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};
export default Invalid;