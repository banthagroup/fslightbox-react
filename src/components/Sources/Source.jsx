import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Loader from "./Loader.jsx";

const Source = (props) => {
    const { fsLightbox, i } = props;
    const {
        sourcesData: { isSourceAlreadyLoadedArray },
        elements: { sourcesJSXComponents },
        componentsControllers: { sources: sourcesControllers },
    } = fsLightbox;

    const [isProperSourceRendered, setIsProperSourceRendered] = useState(false);
    sourcesControllers[i].setIsProperSourceRenderedSetter(setIsProperSourceRendered);

    const loader = (isSourceAlreadyLoadedArray[i] ||
        !isProperSourceRendered) ?
        null : <Loader/>;

    return (
        <>
            { loader }
            { sourcesJSXComponents[i] }
        </>
    );
};


Source.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired
};
export default Source;