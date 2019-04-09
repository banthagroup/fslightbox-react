import React from 'react';
import PropTypes from "prop-types";

const Invalid = (
    {
        fsLightbox: {
            sourcesData: { isSourceAlreadyLoadedArray },
            elements: { sources }
        },
        i
    }
) => {
    if (!isSourceAlreadyLoadedArray[i]) {
        isSourceAlreadyLoadedArray[i] = true;
    }

    return (
        <div
            className="fslightbox-invalid-file-wrapper fslightbox-flex-centered"
            ref={ sources[i] }>
            Invalid file
        </div>
    );
};

Invalid.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired
};
export default Invalid;