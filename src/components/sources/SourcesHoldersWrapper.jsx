import React from 'react';
import PropTypes from 'prop-types';
import SourceHolder from "./SourceHolder.jsx";
import { FULL_DIMENSION_CLASS_NAME, PREFIX } from "../../constants/classes-names";

const SourcesHoldersWrapper = ({ fsLightbox }) => {
    const {
        data: { sourcesCount },
        elements: {
            sourcesHoldersWrapper,
        },
        core: {
            slideSwiping: {
                down: {
                    listener: slideSwipingDownListener
                }
            }
        },
    } = fsLightbox;
    
    const sourceHolders = [];

    for (let i = 0; i < sourcesCount; i++) {
        sourceHolders.push(
            <SourceHolder
                fsLightbox={ fsLightbox }
                index={ i }
                key={ i }
            />
        );
    }

    return (
        <div className={ `${ PREFIX }sources-holders-wrapper ${ FULL_DIMENSION_CLASS_NAME }` }
             ref={ sourcesHoldersWrapper }
             onTouchStart={ slideSwipingDownListener }
             onMouseDown={ slideSwipingDownListener }>
            { sourceHolders }
        </div>
    );
};

SourcesHoldersWrapper.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
};

export default SourcesHoldersWrapper;
