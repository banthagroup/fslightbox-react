import React from 'react';

const DownEventDetector = ({ fsLightbox: { core: { slideSwiping: { down: { listener } } } } }) => {
    return (
        <div
            className={ 'fslightbox-down-event-detector fslightbox-full-dimension' }
            onMouseDown={ listener }
            onTouchStart={ listener }>
        </div>
    );
};

export default DownEventDetector;
