import React, { useState } from 'react';
import { FLEX_CENTERED_CLASS_NAME, PREFIX } from "../../constants/classes-names";

const SlideNumber = (
    {
        fsLightbox: {
            componentsStates: {
                slideNumberUpdater: slideNumberUpdaterState
            },
            data: { sourcesCount },
            stageIndexes
        }
    }
) => {
    const [currentSlideNumberUpdaterValue, setSlideNumberUpdaterValue] = useState(false);
    slideNumberUpdaterState.get = () => currentSlideNumberUpdaterValue;
    slideNumberUpdaterState.set = setSlideNumberUpdaterValue;

    return (
        <div className={ `${ PREFIX }slide-number-container ${ FLEX_CENTERED_CLASS_NAME }` }>
            <div>{ stageIndexes.current + 1 }</div>
            <div className={ `${ PREFIX }slash` }>/</div>
            <div>{ sourcesCount }</div>
        </div>
    );
};
export default SlideNumber;
