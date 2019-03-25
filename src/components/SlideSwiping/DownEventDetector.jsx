import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CURSOR_GRABBING_CLASS_NAME } from "../../constants/CssConstants";

class DownEventDetector extends Component {
    render() {
        const cursorGrabbingClassDependingOnIsSwipingSlides =
            this.props.isSwipingSlides ? CURSOR_GRABBING_CLASS_NAME : '';

        return (
            <div
                className={ 'fslightbox-down-event-detector fslightbox-full-dimension '
                + cursorGrabbingClassDependingOnIsSwipingSlides }
                onMouseDown={ this.props.core.slideSwiping.down.listener }
                onTouchStart={ this.props.core.slideSwiping.down.listener }>
            </div>
        );
    }
}

DownEventDetector.propTypes = {
    isSwipingSlides: PropTypes.bool.isRequired,
    core: PropTypes.object.isRequired
};

export default DownEventDetector;