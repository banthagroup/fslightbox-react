import React, { useEffect, useState } from 'react';
import FsLightbox from "../src/FsLightbox.jsx";
import { testSources } from "../tests/__tests-services__/testVars";

const FunctionalDemoComponent = () => {
    const [toggler, setToggler] = useState(true);
    const [productIndex, setProductIndex] = useState(0);
    let sources = testSources;

    const onClick = () => {
        setProductIndex(productIndex + 1);
    };

    const toggle = () => {
        setToggler(!toggler);

        setTimeout(() => setProductIndex(productIndex + 1), 1000);
    };

    return (
        <>
            <button onClick={ onClick }>remount</button>
            <button onClick={ toggle }>toggle</button>
            <FsLightbox
                toggler={ toggler }
                sources={ sources }
                key={ productIndex }
            />
        </>
    );
};

export default FunctionalDemoComponent;
