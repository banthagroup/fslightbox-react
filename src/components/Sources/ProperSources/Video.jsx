import React, { Component } from 'react';
import PropTypes from "prop-types";

class Video extends Component {
    constructor(props) {
        super(props);
        this.onLoadedMetaData = this.onLoadedMetaData.bind(this);
    }

    onLoadedMetaData(e) {
        this.props.sources[this.props.i].current.classList.remove('fslightbox-opacity-0');
        if (this.props.sourcesData.isSourceAlreadyLoadedArray[this.props.i]) {
            return;
        }
        this.props.sourcesData.sourcesDimensions[this.props.i] = {
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
                ref={ this.props.sources[this.props.i] }
                poster={ this.props.sourcesData.videosPosters[this.props.i] }>
                <source src={ this.props.urls[this.props.i] }/>
            </video>
        );
    }
}

Video.propTypes = {
    urls: PropTypes.array.isRequired,
    sourcesData: PropTypes.object.isRequired,
    sources: PropTypes.array.isRequired,
    i: PropTypes.number.isRequired,
    onFirstSourceLoad: PropTypes.func.isRequired,
};
export default Video;