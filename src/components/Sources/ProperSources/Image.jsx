import React from 'react';
import PropTypes from "prop-types";

const Image = (
    {
        fsLightbox: {
            elements: { sources },
            data: { urls },
            componentsControllers: { sources: { properSources } }
        },
        i,
        onFirstSourceLoad
    }
) => {
    const onImageLoad = ({ target }) => {
        properSources.setIndex(i);
        properSources.setOnFirstSourceLoad(onFirstSourceLoad);
        properSources.setSourceWidth(target.width);
        properSources.setSourceHeight(target.height);
        properSources.handleLoad();
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
    onFirstSourceLoad: PropTypes.func.isRequired,
};
export default Image;