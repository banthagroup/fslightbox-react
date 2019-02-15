import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SlideNumber extends Component {
    render() {
        return (
            <div className="fslightbox-slide-number-container">
                <div className="fslightbox-slide-number">{ this.props.slide }</div>
                <div className="fslightbox-slide-number fslightbox-slash">/</div>
                <div className="fslightbox-slide-number">{ this.props.totalSlides }</div>
            </div>
        );
    }
}

SlideNumber.propTypes = {
    slide: PropTypes.number,
    totalSlides: PropTypes.number,
};
export default SlideNumber;