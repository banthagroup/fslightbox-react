import React from 'react';
import PropTypes from 'prop-types';
import { CURSOR_GRABBING_CLASS_NAME } from "../../constants/CssConstants";

// this component enables up event over the youtube video because it hovers it up with bigger z-index
const SwipingInvisibleHover = ({ fsLightbox: { state: { isSwipingSlides }, data } }) => {
    if (!isSwipingSlides)
        return null;

    const cursorGrabbing = (data.totalSlides > 1) ?
        CURSOR_GRABBING_CLASS_NAME :
        "";

    return (
        <div className={ `fslightbox-swiping-invisible-hover fslightbox-full-dimension ${ cursorGrabbing }` }></div>
    );
};

SwipingInvisibleHover.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
};

export default SwipingInvisibleHover;