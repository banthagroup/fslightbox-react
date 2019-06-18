import React from 'react';
import FullscreenButton from "./toolbar-buttons/FullscreenButton.jsx";
import CloseButton from "./toolbar-buttons/CloseButton.jsx";

const Toolbar = ({ fsLightbox }) => (
    <div className="fslightbox-toolbar">
        <FullscreenButton fsLightbox={ fsLightbox }/>
        <CloseButton fsLightbox={ fsLightbox }/>
    </div>
);
export default Toolbar;
