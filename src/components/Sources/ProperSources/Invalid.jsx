import React, { Component } from 'react';
import PropTypes from "prop-types";

class Invalid extends Component {
    constructor(props) {
        super(props);
        if (!this.props.fsLightbox.sourcesData.isSourceAlreadyLoadedArray[this.props.i]) {
            this.props.fsLightbox.sourcesData.isSourceAlreadyLoadedArray[this.props.i] = true;
        }
    }

    render() {
        return (
            <div
                className="fslightbox-invalid-file-wrapper fslightbox-flex-centered"
                ref={ this.props.fsLightbox.elements.sources[this.props.i] }>
                Invalid file
            </div>
        );
    }
}

Invalid.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired
};
export default Invalid;