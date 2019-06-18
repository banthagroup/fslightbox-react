import React from 'react';
import Toolbar from "./toolbar/Toolbar.jsx";
import SlideNumber from "./SlideNumber.jsx";

const Nav = ({ fsLightbox }) => (
    <div className="fslightbox-nav">
        <Toolbar fsLightbox={ fsLightbox }/>
        <SlideNumber fsLightbox={ fsLightbox }/>
    </div>
);
export default Nav;
