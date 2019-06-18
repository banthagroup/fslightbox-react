import React from 'react';
import PropTypes from "prop-types";

const Image = (
    {
        fsLightbox: {
            data: { sources },
            elements: { sources: sourcesElements },
            collections: { sourcesLoadHandlers }
        },
        index
    }
) => (
    <img
        onLoad={ sourcesLoadHandlers[index].handleLoad }
        className={ "fslightbox-source fslightbox-opacity-0" }
        ref={ sourcesElements[index] }
        src={ sources[index] }
        alt={ sources[index] }
    />
);

Image.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};

export default Image;
