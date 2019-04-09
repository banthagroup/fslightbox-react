import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CURSOR_GRABBING_CLASS_NAME } from "../../constants/CssConstants";

const DownEventDetector = ({ fsLightbox: { core: { slideSwiping: { down: { listener } } } } }) =>
    (
        <div
            className={ 'fslightbox-down-event-detector fslightbox-full-dimension' }
            onMouseDown={ listener }
            onTouchStart={ listener }>
        </div>
    );

DownEventDetector.propTypes = {
    fsLightbox: PropTypes.object.isRequired
};

export default DownEventDetector;