import React, { useState, useEffect } from 'react';
import { PREFIX } from "../../constants/classes-names";

const SlideNumber = (
    {
        fsLightbox: {
            componentsServices,
            props: { sources },
            stageIndexes
        }
    }
) => {
    const [slideNumber, setSlideNumber] = useState(stageIndexes.current + 1);
    componentsServices.setSlideNumber = (number) => {
        setSlideNumber(number);
    };

    const slideNumberOuter = React.createRef();
    const slideNumberInner = React.createRef();

    useEffect(() => {
        if (slideNumberInner.current.offsetWidth > 55) {
            slideNumberOuter.current.style.justifyContent = 'flex-start';
        }
    }, []);

    return (
        <div ref={slideNumberOuter} className={`${PREFIX}slide-number-container`}>
            <div ref={slideNumberInner} className="fslightbox-flex-centered">
                <span data-test-id="slide-number">{slideNumber}</span>
                <span className={`${PREFIX}slash`} />
                <span>{sources.length}</span>
            </div>
        </div>
    );
};
export default SlideNumber;
