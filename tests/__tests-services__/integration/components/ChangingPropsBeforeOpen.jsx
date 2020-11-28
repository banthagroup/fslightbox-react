import React, { useState } from 'react';
import { TEST_VIDEO_URL, testSources } from "../../testVars";
import FsLightbox from "../../../../src/FsLightbox";

export default function ChangingPropsBeforeOpen() {
    const [toggler, setToggler] = useState(false);
    const [sources, setSources] = useState(null);
    const [source, setSource] = useState(null);

    function updateSourcesAndSlide() {
        setSource(TEST_VIDEO_URL);
        setSources(testSources);
    }

    return (
        <>
            <button id="btn-toggler" onClick={() => setToggler(!toggler)}>
                Toggle Lightbox
            </button>
            <button id="btn-update-props" onClick={updateSourcesAndSlide}>
                Update sources and slide
            </button>
            <FsLightbox
                toggler={toggler}
                sources={sources}
                source={source}
            />
        </>
    );
}
