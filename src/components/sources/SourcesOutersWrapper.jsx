import React from 'react';
import SourceOuter from "./SourceOuter.jsx";
import {
    ABSOLUTED_CLASS_NAME,
    FULL_DIMENSION_CLASS_NAME,
    SOURCES_OUTERS_WRAPPER
} from "../../constants/classes-names";

const SourcesOutersWrapper = ({ fsLightbox }) => {
    const {
        data: { sourcesCount },
        elements: { sourcesOutersWrapper, },
        core: { slideSwiping: { down: { listener: slideSwipingDownListener } } },
    } = fsLightbox;

    const sourcesOuters = [];

    for (let i = 0; i < sourcesCount; i++) {
        sourcesOuters.push(
            <SourceOuter
                fsLightbox={ fsLightbox }
                i={ i }
                key={ i }
            />
        );
    }

    return (
        <div className={ `${ SOURCES_OUTERS_WRAPPER } ${ ABSOLUTED_CLASS_NAME } ${ FULL_DIMENSION_CLASS_NAME }` }
             ref={ sourcesOutersWrapper }
             onMouseDown={ slideSwipingDownListener }
             onTouchStart={ slideSwipingDownListener }>
            { sourcesOuters }
        </div>
    );
};

export default SourcesOutersWrapper;
