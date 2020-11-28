import React, { useState } from 'react';
import FsLightbox from "../../../../src/FsLightbox";
import { TEST_IMAGE_URL } from "../../testVars";

export default function OneSource() {
    const [toggler, setToggler] = useState(false);

    return (
        <>
            <button id="btn-toggler" onClick={() => setToggler(!toggler)}>
                Toggle lightbox
            </button>

            <FsLightbox
                toggler={toggler}
                sources={[TEST_IMAGE_URL]}
            />
        </>
    );
}