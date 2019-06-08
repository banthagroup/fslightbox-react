import React from 'react';
import PropTypes from "prop-types";

const Image = (
    {
        fsLightbox: {
            data: { urls },
            elements: { sources },
            collections: { sourcesLoadHandlers }
        },
        index
    }
) => {
    return (
        <img
            onLoad={ sourcesLoadHandlers[index].handleLoad }
            className={ "fslightbox-source fslightbox-opacity-0" }
            ref={ sources[index] }
            src={ urls[index] }
            alt={ urls[index] }
        />
    );
};

Image.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};

export default Image;
