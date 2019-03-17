import React, { Component } from 'react';
import PropTypes from "prop-types";

class Video extends Component {

    constructor(props) {
        super(props);
        this.onLoadedMetaData = this.onLoadedMetaData.bind(this);
    }

    onLoadedMetaData(e) {
        if (this.props._.sourcesData.isSourceAlreadyLoadedArray[this.props.i]) {
            return;
        }
        this.props._.sourcesData.sourcesDimensions[this.props.i] = {
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
                ref={ this.props._.elements.sources[this.props.i] }
                poster={ this.props._.sourcesData.videosPosters[this.props.i] }>
                <source src={ this.props._.data.urls[this.props.i] }/>
            </video>
        );
    }
}

Video.propTypes = {
    _: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired,
    onFirstSourceLoad: PropTypes.func.isRequired,
};
export default Video;