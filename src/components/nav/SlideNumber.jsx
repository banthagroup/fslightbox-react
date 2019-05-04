import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ifOnUpdateExistsHandleItForState } from "../../helpers/state/ifOnUpdateExistsHandleItForState";

const SlideNumber = (
    {
        fsLightbox: {
            data,
            componentsStates: { slide: slideState },
        }
    }
) => {
    const [slide, setSlide] = useState(data.slideOnLightboxOpen);
    slideState.get = () => slide;
    slideState.set = setSlide;

    useEffect(() => {
        if (data.slideOnLightboxOpen !== slide) data.slideOnLightboxOpen = slide;
        ifOnUpdateExistsHandleItForState(slideState);
    }, [slide]);

    if (data.totalSlides === 1) {
        return null;
    }

    return (
        <div className="fslightbox-slide-number-container fslightbox-flex-centered">
            <div>{ slide }</div>
            <div className="fslightbox-slash">/</div>
            <div>{ data.totalSlides }</div>
        </div>
    );
};

SlideNumber.propTypes = {
    fsLightbox: PropTypes.object.isRequired
};
export default SlideNumber;