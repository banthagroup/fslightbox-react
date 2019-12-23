import React, { useState } from 'react';
import FsLightbox from "../../../src/FsLightbox";
import { testSources } from "../testVars";

function TestLightboxForRemounting() {
    const [toggler, setToggler] = useState(false);
    const [lightboxKey, setLightboxKey] = useState(false);

    return (
        <>
            <button id="btn-toggle" onClick={ () => setToggler(!toggler) }>
                Toggle Lightbox
            </button>
            <button id="btn-remount" onClick={ () => setLightboxKey(lightboxKey + 1) }>
                Remount Lightbox
            </button>
            <FsLightbox
                toggler={ toggler }
                sources={ testSources }
                key={ lightboxKey }
            />
        </>
    );
}

export default TestLightboxForRemounting;
