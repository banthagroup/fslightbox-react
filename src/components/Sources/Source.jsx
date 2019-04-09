import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from "./Loader.jsx";

const Source = ({ fsLightbox, index }) => {
    const {
        sourcesData: { isSourceAlreadyLoadedArray },
        elements: { sourcesJSXComponents },
        componentsControllers: { sources: sourcesControllers },
    } = fsLightbox;

    sourcesControllers[index].init();

    useEffect(() => {
        sourcesControllers[index].componentDidMount();
    });

    const [isProperSourceRendered, setIsProperSourceRendered] = useState(false);
    sourcesControllers[index].setIsProperSourceRenderedSetter(setIsProperSourceRendered);
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
    index: PropTypes.number.isRequired
};
export default Source;