import React, { Component } from 'react';
import Toolbar from "./Toolbar.jsx";
import SlideNumber from "./SlideNumber.jsx";
import PropTypes from 'prop-types';

class Nav extends Component {
    render() {
        return (
            <div className="fslightbox-nav">
                <Toolbar fsLightbox={ this.props.fsLightbox }/>
                <SlideNumber
                    slide={ this.props.fsLightbox.state.slide }
                    totalSlides={ this.props.fsLightbox.data.totalSlides }
                />
            </div>
        );
    }
}

Nav.propTypes = {
    fsLightbox: PropTypes.object
};
export default Nav;