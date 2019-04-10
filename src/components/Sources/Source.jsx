import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from "./Loader.jsx";

/**
 * @param { FsLightbox.sourcesData.sourcesToCreateOnConstruct } sourcesToCreateOnConstruct
 * @param { FsLightbox.sourcesData.isSourceAlreadyInitializedArray } isSourceAlreadyInitializedArray
 * @param { FsLightbox.elements.sourcesJSXComponents } sourcesJSXComponents
 * @param { FsLightbox.core.sourceFactory | SourceFactory } sourceFactory
 * @param { number } index
 * @param {{ createSource: function() }} sourceCreator
 */
const Source = (
    {
        fsLightbox: {
            sourcesData: { sourcesToCreateOnConstruct, isSourceAlreadyInitializedArray },
            elements: { sourcesJSXComponents },
            core: { sourceFactory }
        },
        index, sourceCreator
    }
) => {
    let shouldCallUpdateAfterMount = false;
    const [isProperSourceRenderedForFirstTime, setIsProperSourceRenderedForFirstTime] = useState(false);

    sourceCreator.createSource = () => {
        sourceFactory.setSourceIndex(index);
        sourcesJSXComponents[index] = sourceFactory.getSourceComponent();
        if (!shouldCallUpdateAfterMount) {
            setIsProperSourceRenderedForFirstTime(true);
        }
    };

    useEffect(() => {
        if (shouldCallUpdateAfterMount) {
            // after that refresh source stored in sourcesJSXComponents is attached so we can access refs
            setIsProperSourceRenderedForFirstTime(true);
        }
    });

    // request succeeded when lightbox was closed
    if (sourcesToCreateOnConstruct[index]) {
        shouldCallUpdateAfterMount = true;
        sourceCreator.createSource();
    }

    const loader = (isSourceAlreadyInitializedArray[index] ||
        isProperSourceRenderedForFirstTime) ?
        null : <Loader/>;

    return (
        <>
            { loader }
            { sourcesJSXComponents[index] }
        </>
    );
};

Source.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    sourceCreator: PropTypes.object.isRequired,
};

export default Source;