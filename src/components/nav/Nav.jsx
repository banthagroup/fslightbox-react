import React, { Component } from 'react';
import Toolbar from "./Toolbar.jsx";
import SlideNumber from "./SlideNumber.jsx";
import PropTypes from 'prop-types';

class Nav extends Component {
    render() {
        return (
            <div className="fslightbox-nav">
                <Toolbar closeLightbox={ this.props.closeLightbox }/>
                <SlideNumber
                    slide={ this.props.slide }
                    totalSlides={ this.props.totalSlides }
                />
            </div>
        );
    }
}

Nav.propTypes = {
    slide: PropTypes.number,
    totalSlides: PropTypes.number,
    closeLightbox: PropTypes.func
};
export default Nav;