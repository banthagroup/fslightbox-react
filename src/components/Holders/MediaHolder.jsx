import React from 'react';
import PropTypes from 'prop-types';
import SourceHolder from "../Sources/SourceHolder.jsx";

const MediaHolder = ({ fsLightbox }) => {
    const {
        data,
        elements: {
            mediaHolder
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
    for (let i = 0; i < data.totalSlides; i++) {
        sourceHolders.push(
            <SourceHolder
                fsLightbox={ fsLightbox }
                index={ i }
                key={ i }
            />
        );
    }

    return (
        <div className={ 'fslightbox-media-holder' }
             onMouseDown={ listener }
             onTouchStart={ listener }
             ref={ mediaHolder }>
            { sourceHolders }
        </div>
    );
};

MediaHolder.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
};

export default MediaHolder;