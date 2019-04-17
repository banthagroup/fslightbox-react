import React from 'react';
import PropTypes from "prop-types";
import FullscreenButton from "./toolbar-buttons/FullscreenButton.jsx";
import CloseButton from "./toolbar-buttons/CloseButton.jsx";

const Toolbar = ({ fsLightbox }) =>
    (
        <div className="fslightbox-toolbar">
            <FullscreenButton fsLightbox={ fsLightbox }/>
            <CloseButton fsLightbox={ fsLightbox }/>
        </div>
    );

Toolbar.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
};

export default Toolbar;