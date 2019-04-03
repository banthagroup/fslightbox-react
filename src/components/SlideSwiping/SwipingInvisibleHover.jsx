import React from 'react';
import PropTypes from 'prop-types';

// this component enables up event over the youtube video because it hovers it up with bigger z-index
const SwipingInvisibleHover = ({ isSwipingSlides }) => {
    // if (!isSwipingSlides)
        return null;

    return (
        <div className="fslightbox-swiping-invisible-hover fslightbox-full-dimension"></div>
    );
};

SwipingInvisibleHover.propTypes = {
    isSwipingSlides: PropTypes.bool.isRequired,
};

export default SwipingInvisibleHover;