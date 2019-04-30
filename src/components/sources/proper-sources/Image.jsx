import React from 'react';
import PropTypes from "prop-types";

/**
 * @param { FsLightbox.data.urls } urls
 * @param { FsLightbox.elements.sources } sources
 * @param { FsLightbox.sourcesData.isSourceAlreadyInitializedArray } isSourceAlreadyInitializedArray
 * @param { FsLightbox.core.sourceController | SetUpSourceController } sourceController
 * @param { number } index
 */
const Image = (
    {
        fsLightbox: {
            data: { urls },
            sourcesData: { isSourceAlreadyInitializedArray },
            elements: { sources },
            core: { sourceController }
        },
        index
    }
) => {
    const onImageLoad = ({ target }) => {
        sourceController.setIndex(index);
        (isSourceAlreadyInitializedArray[index]) ?
            sourceController.normalLoad() :
            initialLoad(target);
    };

    const initialLoad = (target) => {
        sourceController.setSourceWidth(target.width);
        sourceController.setSourceHeight(target.height);
        sourceController.initialLoad();
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