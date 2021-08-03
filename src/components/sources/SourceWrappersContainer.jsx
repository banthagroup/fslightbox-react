import React from 'react';
import { ABSOLUTED_CLASS_NAME, FULL_DIMENSION_CLASS_NAME } from "../../constants/classes-names";
import SourceMainWrapper from "./SourceMainWrapper.jsx";

export default ({ fsLightbox }) => {
    const {
        core: { slideSwipingDown: { listener: slideSwipingDownListener } },
        elements: { sourceMainWrappersWrapper, },
        props: { sources },
    } = fsLightbox;

    const sourceMainWrappers = [];

    for (let i = 0; i < sources.length; i++) {
        sourceMainWrappers.push(
            <SourceMainWrapper
                fsLightbox={fsLightbox}
                i={i}
                key={i}
            />
        );
    }

    return (
        <div className={`${ABSOLUTED_CLASS_NAME} ${FULL_DIMENSION_CLASS_NAME}`}
             data-test-id="source-wrappers-container"
             onMouseDown={slideSwipingDownListener}
             onTouchStart={slideSwipingDownListener}
             ref={sourceMainWrappersWrapper}>
            {sourceMainWrappers}
        </div>
    );
};
