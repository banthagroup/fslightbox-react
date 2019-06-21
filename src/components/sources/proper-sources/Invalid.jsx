import React, { useEffect } from 'react';

const Invalid = (
    {
        fsLightbox: {
            core: { sourceAnimator },
            elements: { sources }
        },
        index
    }
) => {
    useEffect(() => {
        sourceAnimator.animateSourceFromIndex(index).fadeIn();
    });

    return (
        <div
            className="fslightbox-invalid-file-wrapper fslightbox-flex-centered"
            ref={ sources[index] }>
            Invalid file
        </div>
    );
};

export default Invalid;
