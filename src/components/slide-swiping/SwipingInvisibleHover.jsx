import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CURSOR_GRABBING_CLASS_NAME } from "../../constants/cssConstants";

// this component enables up event over the youtube video because it hovers it up with bigger z-index
const SwipingInvisibleHover = (
    {
        fsLightbox: {
            data: { totalSlides },
            componentsStates: {
                isSwipingSlides: isSwipingSlidesState
            }
        }
    }
) => {
    const [isSwipingSlides, setIsSwipingSlide] = useState(false);
    isSwipingSlidesState.get = () => isSwipingSlides;
    isSwipingSlidesState.set = setIsSwipingSlide;

    if (!isSwipingSlides)
        return null;

    const cursorGrabbing = (totalSlides > 1) ?
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