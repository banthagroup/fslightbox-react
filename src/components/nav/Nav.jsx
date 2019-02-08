import React, { Component } from 'react';
import Toolbar from "./Toolbar.jsx";
import SlideNumber from "./SlideNumber.jsx";
import PropTypes from 'prop-types';

class Nav extends Component {
    render() {
        return (
            <div className="fslightbox-nav">
                <Toolbar closeLightbox={ this.props.closeLightbox }/>
                <SlideNumber/>
            </div>
        );
    }
}

Nav.propTypes = {
    closeLightbox: PropTypes.func
};
export default Nav;