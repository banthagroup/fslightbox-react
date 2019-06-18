import React, { useState } from 'react';

const SlideNumber = (
    {
        fsLightbox: {
            stageIndexes,
            data,
            componentsStates: {
                slideNumberUpdater: slideNumberUpdaterState
            },
        }
    }
) => {
    const [slideNumberUpdater, setSlideNumberUpdater] = useState(false);
    slideNumberUpdaterState.get = () => slideNumberUpdater;
    slideNumberUpdaterState.set = setSlideNumberUpdater;

    return (data.sourcesCount === 1) ?
        null :
        (
            <div className="fslightbox-slide-number-container fslightbox-flex-centered">
                <div>{ stageIndexes.current + 1 }</div>
                <div className="fslightbox-slash">/</div>
                <div>{ data.sourcesCount }</div>
            </div>
        );
};
export default SlideNumber;
