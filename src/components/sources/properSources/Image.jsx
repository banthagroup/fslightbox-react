import React, { Component } from 'react';
import PropTypes from "prop-types";

class Image extends Component {
    render() {
        return (
            <img
                className="fslightbox-single-source"
                ref={ this.props.fsLightbox.elements.sources[this.props.index] }
                src={ this.props.fsLightbox.urls[this.props.index] }
                alt={ this.props.fsLightbox.urls[this.props.index] }
            />
        );
    }
}


Image.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};
export default Image;