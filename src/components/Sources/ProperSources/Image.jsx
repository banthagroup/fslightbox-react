import React  from 'react';
import PropTypes from "prop-types";

const Image = (
    {
        fsLightbox: {
            elements: { sources },
            data: { urls },
            core: { properSourceController }
        },
        index
    }
) => {
    const onImageLoad = ({ target }) => {
        properSourceController.setIndex(index);
        properSourceController.setSourceWidth(target.width);
        properSourceController.setSourceHeight(target.height);
        properSourceController.handleLoad();
    };

    return (
        <img
            onLoad={ onImageLoad }
            className={ "fslightbox-single-source fslightbox-opacity-0" }
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