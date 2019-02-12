import React, { Component } from 'react';
import PropTypes from "prop-types";

class Image extends Component {

    constructor(props) {
        super(props);
        this.imageOnLoad = this.imageOnLoad.bind(this);
    }

    imageOnLoad(e) {
        this.props.fsLightbox.sourceDimensions[this.props.index] = {
            width: e.target.width,
            height: e.target.height
        };
        e.target.classList.add('fslightbox-fade-in-class');
        this.props.onSourceLoad();
    }

    render() {
        return (
            <>
                <img
                    onLoad={ this.imageOnLoad }
                    className="fslightbox-single-source"
                    ref={ this.props.fsLightbox.elements.sources[this.props.index] }
                    src={ this.props.fsLightbox.urls[this.props.index] }
                    alt={ this.props.fsLightbox.urls[this.props.index] }
                />
            </>
        );
    }
}


Image.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onSourceLoad: PropTypes.func.isRequired,
};
export default Image;