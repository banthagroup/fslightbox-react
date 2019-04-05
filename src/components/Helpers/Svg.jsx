import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Svg extends Component {
    render() {
        return (
            <svg width={ this.props.size }
                 height={ this.props.size }
                 viewBox={ this.props.viewBox }
                 xmlns="http://www.w3.org/2000/svg">
                <path fill="#fff" className="fslightbox-svg-path" d={ this.props.d }></path>
            </svg>
        );
    }
}

Svg.propTypes = {
    viewBox: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    d: PropTypes.string.isRequired
};

export default Svg;