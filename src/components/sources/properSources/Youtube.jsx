import React, { Component } from 'react';
import PropTypes from "prop-types";
import { getYoutubeVideoIDFromURL } from "../../../utils/SourceType/getYoutubeVideoIDFromURL";

class Youtube extends Component {
    render() {
        return (
            <iframe
                className="fslightbox-single-source fslightbox-fade-in-class"
                ref={ this.props._.elements.sources[this.props.i] }
                src={ "https://www.youtube.com/embed/" +
                getYoutubeVideoIDFromURL(this.props._.urls[this.props.i]) +
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
    _: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired,
};
export default Youtube;