import React from 'react';
import PropTypes from 'prop-types';
import SourceHolder from "./SourceHolder.jsx";
import { PREFIX } from "../../constants/classes-names";

const SourceHoldersWrapper = ({ fsLightbox }) => {
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
        <div className={ `${ PREFIX }sources-holders-wrapper` }
             onMouseDown={ slideSwipingDownListener }
             onTouchStart={ slideSwipingDownListener }
             ref={ sourcesHoldersWrapper }>
            { sourceHolders }
        </div>
    );
};

SourceHoldersWrapper.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
};

export default SourceHoldersWrapper;
