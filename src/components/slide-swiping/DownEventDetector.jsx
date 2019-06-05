import React from 'react';
import PropTypes from 'prop-types';

const DownEventDetector = ({ fsLightbox: { core: { slideSwiping: { down: { listener } } } } }) => {
    return (
        <div
            className={ 'fslightbox-down-event-detector fslightbox-full-dimension' }
            onMouseDown={ listener }
            onTouchStart={ listener }>
        </div>
    );
};

DownEventDetector.propTypes = {
    fsLightbox: PropTypes.object.isRequired
};

export default DownEventDetector;
