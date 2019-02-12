import React, { Component } from 'react';
import PropTypes from "prop-types";

class Invalid extends Component {
    render() {
        return (
            <div
                className="fslightbox-invalid-file-wrapper"
                ref={ this.props.fsLightbox.elements.sources[this.props.index] }>
                Invalid file
            </div>
        );
    }
}

Invalid.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};
export default Invalid;