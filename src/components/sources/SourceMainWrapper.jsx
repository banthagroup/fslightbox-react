import React, { useState } from 'react';
import {
    ABSOLUTED_CLASS_NAME,
    FLEX_CENTERED_CLASS_NAME,
    FULL_DIMENSION_CLASS_NAME
} from "../../constants/classes-names";
import Loader from "../helpers/Loader.jsx";
import SourceAnimationWrapper from "./SourceAnimationWrapper.jsx";

const SourceMainWrapper = ({ fsLightbox, i }) => {
    const { componentsServices: { hideSourceLoaderCollection }, elements: { sourceMainWrappers } } = fsLightbox;

    const [isSourceLoaded, setIsSourceLoaded] = useState(false);
    hideSourceLoaderCollection[i] = () => setIsSourceLoaded(true);

    return (
        <div data-test-class="source-main-wrapper"
             ref={sourceMainWrappers[i]}
             className={`${ABSOLUTED_CLASS_NAME} ${FULL_DIMENSION_CLASS_NAME} ${FLEX_CENTERED_CLASS_NAME}`}>
            {!isSourceLoaded && <Loader />}
            <SourceAnimationWrapper fsLightbox={fsLightbox} i={i} />
        </div>
    );
};

export default SourceMainWrapper;
