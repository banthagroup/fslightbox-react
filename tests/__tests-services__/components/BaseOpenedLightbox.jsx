import React from 'react';
import FsLightbox from "../../../src/FsLightbox.jsx";
import { testSources, testTypes } from "../testVars";

export default function BaseOpenedLightbox() {
    return <FsLightbox
        toggler={false}
        openOnMount={true}
        sources={testSources}
        types={testTypes}
    />;
}