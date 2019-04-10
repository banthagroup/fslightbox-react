import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from "./Loader.jsx";
import { SourceFactory } from "../../core/Source/SourceFactory";
import { SourceSizeAdjuster } from "../../core/Source/SourceSizeAdjuster";
import { FADE_IN_CLASS_NAME, FADE_IN_COMPLETE_CLASS_NAME } from "../../constants/CssConstants";

const Source = ({ fsLightbox, index, sourceCreator }) => {
    const {
        sourcesData: { isSourceAlreadyLoadedArray },
        elements: { sourcesJSXComponents },
    } = fsLightbox;

    let shouldCallUpdateAfterMount;
    const [isProperSourceRendered, setIsProperSourceRendered] = useState(false);

    const init = () => {
        shouldCallUpdateAfterMount = false;
        // request succeeded when lightbox was closed
        if (fsLightbox.sourcesData.sourcesToCreateOnConstruct[index]) {
            shouldCallUpdateAfterMount = true;
            sourceCreator.createSource();
        }
    };

    sourceCreator.createSource = () => {
        const sourceFactory = new SourceFactory(fsLightbox);
        sourceFactory.setSourceIndex(index);
        fsLightbox.elements.sourcesJSXComponents[index] = sourceFactory.getSourceComponent();
        if (!shouldCallUpdateAfterMount) {
            setIsProperSourceRendered(true);
        }
    };

    useEffect(() => {
        if (shouldCallUpdateAfterMount) {
            // after that refresh source stored in sourcesJSXComponents is attached so we can access refs
            setIsProperSourceRendered(true);
        }
    });

    init();

    const loader = (isSourceAlreadyLoadedArray[index] ||
        isProperSourceRendered) ?
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