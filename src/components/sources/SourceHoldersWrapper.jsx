import React from 'react';
import PropTypes from 'prop-types';
import SourceHolder from "./SourceHolder.jsx";

const SourceHoldersWrapper = ({ fsLightbox }) => {
    const {
        data: { totalSlides },
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

    for (let i = 0; i < totalSlides; i++) {
        sourceHolders.push(
            <SourceHolder
                fsLightbox={ fsLightbox }
                index={ i }
                key={ i }
            />
        );
    }

    return (
        <div className={ 'fslightbox-sources-holders-wrapper' }
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
