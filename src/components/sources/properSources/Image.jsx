import React, { Component } from 'react';
import PropTypes from "prop-types";

class Image extends Component {

    constructor(props) {
        super(props);
        this.imageOnLoad = this.imageOnLoad.bind(this);
    }

    imageOnLoad(e) {
        if (this.props._.sourcesData.isSourceAlreadyLoadedArray[this.props.i]) {
            return;
        }

        this.props._.sourcesData.sourcesDimensions[this.props.i] = {
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
                    className={ "fslightbox-single-source" }
                    ref={ this.props._.elements.sources[this.props.i] }
                    src={ this.props._.data.urls[this.props.i] }
                    alt={ this.props._.data.urls[this.props.i] }
                />
            </>
        );
    }
}


Image.propTypes = {
    _: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired,
    onFirstSourceLoad: PropTypes.func.isRequired,
};
export default Image;