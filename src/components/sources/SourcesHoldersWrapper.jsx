import React from 'react';
import PropTypes from 'prop-types';
import SourceHolder from "./SourceHolder.jsx";

const SourcesHoldersWrapper = ({ fsLightbox }) => {
    const {
        data: { totalSlides },
        elements: {
            sourcesHoldersWrapper,
        },
        core: {
            slideSwiping: {
                down: {
                    listener
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
             onMouseDown={ listener }
             onTouchStart={ listener }
             ref={ sourcesHoldersWrapper }>
            { sourceHolders }
        </div>
    );
};

SourcesHoldersWrapper.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
};

export default SourcesHoldersWrapper;