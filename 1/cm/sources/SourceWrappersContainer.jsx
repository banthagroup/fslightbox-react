import React from 'react';
import { ABSOLUTED_CLASS_NAME, FULL_DIMENSION_CLASS_NAME } from "../../cn/classes-names";
import smw from "./smw.jsx";

export default ({ fsLightbox }) => {
    const {
        core: { slideSwipingDown: { listener: slideSwipingDownListener } },
        elements: { sourceMainWrappersWrapper, },
        props: { sources },
    } = fsLightbox;

    const sourceMainWrappers = [];

    for (let i = 0; i < sources.length; i++) {
        sourceMainWrappers.push(
            <smw
                o={fsLightbox}
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
