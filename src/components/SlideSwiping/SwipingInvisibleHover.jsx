import React from 'react';
import PropTypes from 'prop-types';

const SwipingInvisibleHover = ({ isSwipingSlides }) => {
    if(!isSwipingSlides)
        return null;

    return (
        <div className="fslightbox-slide"></div>
    );
};

SwipingInvisibleHover.propTypes = {
    isSwipingSlides: PropTypes.bool.isRequired,
};

export default SwipingInvisibleHover;