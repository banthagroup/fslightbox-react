import React, { useState } from 'react';
import { ABSOLUTED_CLASS_NAME, FULL_DIMENSION_CLASS_NAME, PREFIX } from "../../constants/classes-names";

// this component enables up event over the youtube video because it hovers it up with bigger z-index
const SlideSwipingHoverer = ({ fsLightbox: { componentsServices } }) => {
    const [isSlideSwipingHovererShown, setIsSlideSwipingHovererShown] = useState(false);

    componentsServices.showSlideSwipingHovererIfNotYet = () => {
        if (!isSlideSwipingHovererShown) {
            setIsSlideSwipingHovererShown(true);
        }
    };

    componentsServices.hideSlideSwipingHovererIfShown = () => {
        if (isSlideSwipingHovererShown) {
            setIsSlideSwipingHovererShown(false);
        }
    };

    return isSlideSwipingHovererShown
        && <div className={`${PREFIX}slide-swiping-hoverer ${FULL_DIMENSION_CLASS_NAME} ${ABSOLUTED_CLASS_NAME}`} />;
};

export default SlideSwipingHoverer;
