import React from 'react';
import SourceMainWrapper from "./SourceMainWrapper.jsx";
import { ABSOLUTED_CLASS_NAME, FULL_DIMENSION_CLASS_NAME } from "../../constants/classes-names";

const SourceWrappersContainer = ({ fsLightbox }) => {
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
        <div data-test-id="source-wrappers-container"
             className={`${ABSOLUTED_CLASS_NAME} ${FULL_DIMENSION_CLASS_NAME}`}
             ref={sourceMainWrappersWrapper}
             onMouseDown={slideSwipingDownListener}
             onTouchStart={slideSwipingDownListener}>
            {sourceMainWrappers}
        </div>
    );
};

export default SourceWrappersContainer;
