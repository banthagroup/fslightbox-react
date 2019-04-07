import React, { Component } from 'react';
import PropTypes from "prop-types";

class Video extends Component {
    constructor(props) {
        super(props);
        this.onLoadedMetaData = this.onLoadedMetaData.bind(this);
    }

    onLoadedMetaData(e) {
        this.props.fsLightbox.elements.sources[this.props.i].current.classList.remove('fslightbox-opacity-0');
        if (this.props.fsLightbox.sourcesData.isSourceAlreadyLoadedArray[this.props.i]) {
            return;
        }
        this.props.fsLightbox.sourcesData.sourcesDimensions[this.props.i] = {
            width: e.target.videoWidth,
            height: e.target.videoHeight
        };
        this.props.onFirstSourceLoad();
    }

    render() {
        return (
            <video
                onLoadedMetadata={ this.onLoadedMetaData }
                className="fslightbox-single-source fslightbox-video fslightbox-opacity-0"
                controls
                ref={ this.props.fsLightbox.elements.sources[this.props.i] }
                poster={ this.props.fsLightbox.sourcesData.videosPosters[this.props.i] }>
                <source src={ this.props.fsLightbox.data.urls[this.props.i] }/>
            </video>
        );
    }
}

Video.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired,
    onFirstSourceLoad: PropTypes.func.isRequired,
};
export default Video;