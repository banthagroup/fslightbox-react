import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from "./Toolbar.jsx";
import SlideNumber from "./SlideNumber.jsx";

class Nav extends Component {
    render() {
        return (
            <div className="fslightbox-nav">
                <Toolbar
                    core={ this.props.core }
                    data={ this.props.data }
                />
                { (this.props.data.totalSlides > 1) ?
                    <SlideNumber
                        slide={ this.props.slide }
                        totalSlides={ this.props.data.totalSlides }
                    /> : null
                }
            </div>
        );
    }
}

Nav.propTypes = {
    data: PropTypes.object.isRequired,
    core: PropTypes.object.isRequired,
    slide: PropTypes.number.isRequired,
};
export default Nav;