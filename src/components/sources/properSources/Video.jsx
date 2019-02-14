import React, { Component } from 'react';
import PropTypes from "prop-types";

class Video extends Component {

    constructor(props) {
        super(props);
        this.onLoadedMetaData = this.onLoadedMetaData.bind(this);
    }

    onLoadedMetaData(e) {
        if (this.props.fsLightbox.isSourceAlreadyLoaded[this.props.index]) {
            return;
        }
        this.props.fsLightbox.sourceDimensions[this.props.index] = {
            width: e.target.videoWidth,
            height: e.target.videoHeight
        };
        this.props.onFirstSourceLoad();
    }

    render() {
        return (
            <video
                onLoadedMetadata={ this.onLoadedMetaData }
                className="fslightbox-single-source fslightbox-video"
                controls
                ref={ this.props.fsLightbox.elements.sources[this.props.index] }
                poster={ this.props.fsLightbox.videosPosters[this.props.index] }>
                <source src={ this.props.fsLightbox.urls[this.props.index] }/>
            </video>
        );
    }
}

Video.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onFirstSourceLoad: PropTypes.func.isRequired,
};
export default Video;