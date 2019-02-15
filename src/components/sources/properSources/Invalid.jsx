import React, { Component } from 'react';
import PropTypes from "prop-types";

class Invalid extends Component {
    render() {
        return (
            <div
                className="fslightbox-invalid-file-wrapper"
                ref={ this.props._.elements.sources[this.props.i] }>
                Invalid file
            </div>
        );
    }
}

Invalid.propTypes = {
    _: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired,
};
export default Invalid;