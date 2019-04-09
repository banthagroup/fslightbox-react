import React from 'react';
import PropTypes from 'prop-types';

const SlideNumber = ({ fsLightbox: { state: { slide }, data: { totalSlides }} }) => (
    <div className="fslightbox-slide-number-container fslightbox-flex-centered">
        <div>{ slide }</div>
        <div className="fslightbox-slash">/</div>
        <div>{ totalSlides }</div>
    </div>
);

SlideNumber.propTypes = {
    fsLightbox: PropTypes.object.isRequired
};
export default SlideNumber;``