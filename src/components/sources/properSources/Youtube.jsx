import React, { Component } from 'react';
import PropTypes from "prop-types";
import { getYoutubeVideoIDFromURL } from "../../../utils/SourceType/getYoutubeVideoIDFromURL";

class Youtube extends Component {
    render() {
        return (
            <iframe
                className="fslightbox-single-source"
                ref={ this.props.fsLightbox.elements.sources[this.props.index] }
                src={ "https://www.youtube.com/embed/" +
                getYoutubeVideoIDFromURL(this.props.fsLightbox.urls[this.props.index]) +
                '?enablejsapi=1' }
                allowFullScreen={ true }
                width={ 1920 }
                height={ 1080 }
                frameBorder="0"
            />
        );
    }
}

Youtube.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};
export default Youtube;