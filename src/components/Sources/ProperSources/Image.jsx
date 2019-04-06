import React, { Component } from 'react';
import PropTypes from "prop-types";

class Image extends Component {
    constructor(props) {
        super(props);
        this.imageOnLoad = this.imageOnLoad.bind(this);
    }

    imageOnLoad(e) {
        this.props.sources[this.props.i].current.classList.remove('fslightbox-opacity-0');
        if (this.props.sourcesData.isSourceAlreadyLoadedArray[this.props.i]) {
            return;
        }

        this.props.sourcesData.sourcesDimensions[this.props.i] = {
            width: e.target.width,
            height: e.target.height
        };
        this.props.onFirstSourceLoad();
    }

    render() {
        return (
            <>
                <img
                    onLoad={ this.imageOnLoad }
                    className={ "fslightbox-single-source fslightbox-opacity-0" }
                    ref={ this.props.sources[this.props.i] }
                    src={ this.props.urls[this.props.i] }
                    alt={ this.props.urls[this.props.i] }
                />
            </>
        );
    }
}


Image.propTypes = {
    urls: PropTypes.array.isRequired,
    sourcesData: PropTypes.object.isRequired,
    sources: PropTypes.array.isRequired,
    i: PropTypes.number.isRequired,
    onFirstSourceLoad: PropTypes.func.isRequired,
};
export default Image;