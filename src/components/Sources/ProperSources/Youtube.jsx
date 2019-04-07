import React, { Component } from 'react';
import PropTypes from "prop-types";
import { getYoutubeVideoIDFromURL } from "../../../utils/SourceType/getYoutubeVideoIDFromURL";

class Youtube extends Component {
    componentDidMount() {
        this.props.sources[this.props.i].current.classList.remove('fslightbox-opacity-0');
        if (this.props.sourcesData.isSourceAlreadyLoadedArray[this.props.i]) {
            return;
        }
        this.props.sourcesData.sourcesDimensions[this.props.i] = {
            width: 1920,
            height: 1080,
        };
        this.props.onFirstSourceLoad();
    }

    render() {
        return (
            <iframe
                className="fslightbox-single-source fslightbox-opacity-0"
                ref={ this.props.sources[this.props.i] }
                src={
                    "https://www.youtube.com/embed/"
                    + getYoutubeVideoIDFromURL(this.props.urls[this.props.i])
                    + '?enablejsapi=1'
                }
                allowFullScreen={ true }
                frameBorder="0"
            />
        );
    }
}

Youtube.propTypes = {
    urls: PropTypes.array.isRequired,
    sourcesData: PropTypes.object.isRequired,
    sources: PropTypes.array.isRequired,
    onFirstSourceLoad: PropTypes.func.isRequired,
    i: PropTypes.number.isRequired,
};
export default Youtube;