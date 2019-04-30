import React, { useState } from 'react';
import PropTypes from 'prop-types';

// this component enables up event over the youtube video because it hovers it up with bigger z-index
const SwipingInvisibleHover = (
    {
        fsLightbox: {
            componentsStates: {
                hasMovedWhileSwiping: hasMovedWhileSwipingState,
            }
        }
    }
) => {
    const [hasMovedWhileSwiping, setHasMovedWhileSwiping] = useState(false);
    hasMovedWhileSwipingState.get = () => hasMovedWhileSwiping;
    hasMovedWhileSwipingState.set = setHasMovedWhileSwiping;

    return (hasMovedWhileSwiping) ? (
        <div className="fslightbox-swiping-invisible-hover fslightbox-full-dimension"></div>
    ) : null;
};

SwipingInvisibleHover.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
};

export default SwipingInvisibleHover;