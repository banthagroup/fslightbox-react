import React  from 'react';
import PropTypes from "prop-types";

const Image = (
    {
        fsLightbox: {
            elements: { sources },
            data: { urls },
            componentsControllers: { properSource }
        },
        i
    }
) => {
    const onImageLoad = ({ target }) => {
        properSource.setIndex(i);
        properSource.setSourceWidth(target.width);
        properSource.setSourceHeight(target.height);
        properSource.handleLoad();
    };

    return (
        <img
            onLoad={ onImageLoad }
            className={ "fslightbox-single-source fslightbox-opacity-0" }
            ref={ sources[i] }
            src={ urls[i] }
            alt={ urls[i] }
        />
    );
};

Image.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired,
};

export default Image;