import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from "./Toolbar.jsx";
import SlideNumber from "./SlideNumber.jsx";

const Nav = ({ fsLightbox }) => (
    <div className="fslightbox-nav">
        <Toolbar
            fsLightbox={ fsLightbox }
        />
        { (fsLightbox.data.totalSlides > 1) ?
            <SlideNumber
                fsLightbox={ fsLightbox }
            /> : null
        }
    </div>
);

Nav.propTypes = {
    fsLightbox: PropTypes.object.isRequired
};
export default Nav;