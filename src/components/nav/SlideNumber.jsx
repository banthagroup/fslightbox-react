import React, { Component } from 'react';

class SlideNumber extends Component {
    render() {
        return (
            <div className="fslightbox-slide-number-container">
                <div className="fslightbox-slide-number">1</div>
                <div className="fslightbox-slide-number fslightbox-slash">/</div>
                <div className="fslightbox-slide-number">4</div>
            </div>
        );
    }
}

export default SlideNumber;