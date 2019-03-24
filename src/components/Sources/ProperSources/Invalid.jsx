import React, { Component } from 'react';
import PropTypes from "prop-types";

class Invalid extends Component {
    constructor(props) {
        super(props);
        if (!this.props.sourcesData.isSourceAlreadyLoadedArray[this.props.i]) {
            this.props.sourcesData.isSourceAlreadyLoadedArray[this.props.i] = true;
        }
    }

    render() {
        return (
            <div
                className="fslightbox-invalid-file-wrapper fslightbox-flex-centered"
                ref={ this.props.sources[this.props.i] }>
                Invalid file
            </div>
        );
    }
}

Invalid.propTypes = {
    sources: PropTypes.array.isRequired,
    sourcesData: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired
};
export default Invalid;