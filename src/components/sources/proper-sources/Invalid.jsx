import React, { useEffect } from 'react';
import PropTypes from "prop-types";

const Invalid = (
    {
        fsLightbox: {
            core: { sourceAnimator },
            elements: { sources }
        },
        index
    }
) => {
    useEffect(() => {
        sourceAnimator.animateSourceFromSlide(index + 1).fadeIn();
    });

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