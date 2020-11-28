import React from "react";
import FsLightbox from "../../../../src/FsLightbox.jsx";
import { testSources } from "../../testVars";

export default function AutomaticTypeDetectionLightbox() {
    return (
        <FsLightbox
            toggler={false}
            openOnMount={true}
            sources={testSources}
        />
    );
}