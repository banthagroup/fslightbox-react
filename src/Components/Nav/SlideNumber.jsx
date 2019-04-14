import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ifOnUpdateExistsHandleItForState } from "../../Helpers/State/ifOnUpdateExistsHandleItForState";

const SlideNumber = (
    {
        fsLightbox: {
            data: { totalSlides },
            componentsStates: { slide: slideState },
        }
    }
) => {
    const [slide, setSlide] = useState(1);
    slideState.get = () => slide;
    slideState.set = setSlide;

    useEffect(() => {
        ifOnUpdateExistsHandleItForState(slideState);
    });

    if (totalSlides === 1) {
        return null;
    }

    return (
        <div className="fslightbox-slide-number-container fslightbox-flex-centered">
            <div>{ slide }</div>
            <div className="fslightbox-slash">/</div>
            <div>{ totalSlides }</div>
        </div>
    );
};

SlideNumber.propTypes = {
    fsLightbox: PropTypes.object.isRequired
};
export default SlideNumber;