import React from 'react';
import PropTypes from "prop-types";
import FullscreenButton from "./ToolbarButtons/FullscreenButton.jsx";
import CloseButton from "./ToolbarButtons/CloseButton.jsx";

const Toolbar = ({ fsLightbox }) => {
    return (
        <div className="fslightbox-toolbar">
            <FullscreenButton fsLightbox={ fsLightbox }/>
            <CloseButton fsLightbox={ fsLightbox }/>
        </div>
    );
};

Toolbar.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
};

export default Toolbar;