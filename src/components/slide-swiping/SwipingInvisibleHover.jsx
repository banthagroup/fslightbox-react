import React, { useState } from 'react';
import { FULL_DIMENSION_CLASS_NAME, PREFIX } from "../../constants/classes-names";

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
        <div className={ `${ PREFIX }swiping-invisible-hover ${ FULL_DIMENSION_CLASS_NAME }` }/>
    ) : null;
};

export default SwipingInvisibleHover;
