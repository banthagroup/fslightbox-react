import React, { Component } from 'react';
import PropTypes from "prop-types";

class Video extends Component {


    render() {
        return (
            <video
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
};
export default Video;