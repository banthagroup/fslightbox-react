import React, { Component } from 'react';
import Toolbar from "./Toolbar.jsx";
import SlideNumber from "./SlideNumber.jsx";
import PropTypes from 'prop-types';

class Nav extends Component {
    render() {
        return (
            <div className="fslightbox-nav">
                <Toolbar _={ this.props._ }/>
                <SlideNumber
                    slide={ this.props._.slide }
                    totalSlides={ this.props._.totalSlides }
                />
            </div>
        );
    }
}

Nav.propTypes = {
    _: PropTypes.object
};
export default Nav;