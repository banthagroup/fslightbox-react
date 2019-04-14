import React from 'react';
import PropTypes from "prop-types";

/**
 * @param { FsLightbox.data.urls } urls
 * @param { FsLightbox.elements.sources } sources
 * @param { FsLightbox.sourcesData.isSourceAlreadyInitializedArray } isSourceAlreadyInitializedArray
 * @param { FsLightbox.core.properSourceController | ProperSourceController } properSourceController
 * @param { number } index
 */
const Image = (
    {
        fsLightbox: {
            data: { urls },
            sourcesData: { isSourceAlreadyInitializedArray },
            elements: { sources },
            core: { properSourceController }
        },
        index
    }
) => {

    const onImageLoad = ({ target }) => {
        properSourceController.setIndex(index);
        (isSourceAlreadyInitializedArray[index]) ?
            properSourceController.normalLoad() :
            initialLoad(target);
    };

    const initialLoad = (target) => {
        properSourceController.setSourceWidth(target.width);
        properSourceController.setSourceHeight(target.height);
        properSourceController.initialLoad();
    };

    return (
        <img
            onLoad={ onImageLoad }
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