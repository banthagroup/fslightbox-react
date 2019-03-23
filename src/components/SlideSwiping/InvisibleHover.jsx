import React from 'react';
import PropTypes from 'prop-types';

const InvisibleHover = ({ isSwipingSlides }) => {
    if(!isSwipingSlides)
        return null;

    return (
        <div className="fslightbox-invisible-hover"></div>
    );
};

InvisibleHover.propTypes = {
    isSwipingSlides: PropTypes.bool.isRequired,
};

export default InvisibleHover;