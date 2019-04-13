import React from 'react';
import PropTypes from 'prop-types';
import Svg from "../Helpers/Svg.jsx";

/**
 * @param { FsLightbox.core.stageSources.getNextSlideNumber | Function } getNextSlideNumber
 * @param { FsLightbox.core.slideChanger.changeSlideTo | function(number) } changeSlideTo
 * @param changeSlideTo
 */
const SlideButtonRight = (
    {
        fsLightbox: {
            core: {
                stageSources: { getNextSlideNumber },
                slideChanger: { changeSlideTo }
            }
        }
    }
) => {
    const goToNextSlide = () => {
        changeSlideTo(getNextSlideNumber());
    };

    return (
        <div onClick={ goToNextSlide }
             title="Next slide"
             className="fslightbox-slide-btn-container fslightbox-slide-btn-right-container">
            <div className="fslightbox-slide-btn fslightbox-flex-centered">
                <Svg
                    viewBox="0 0 20 20"
                    size="26px"
                    d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"
                />
            </div>
        </div>
    );
}

SlideButtonRight.propTypes = {
    fsLightbox: PropTypes.object.isRequired
};
export default SlideButtonRight;