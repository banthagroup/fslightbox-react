import React, { Component } from 'react';
import Source from "./Source.jsx";
import PropTypes from 'prop-types';
import HttpRequester  from "../../core/HttpRequester";

class SourceHolder extends Component {

    constructor(props) {
        super(props);
        this.initRequest();
    }

    initRequest() {
        this.httpRequester = new HttpRequester();
        this.httpRequester.setUrl(this.props.fsLightbox.urls[this.props.index]);
        this.httpRequester.getSourceType();
    }


    render() {
        return (
            <div ref={ this.props.fsLightbox.elements.sourceHolders[this.props.index] }
                 className="fslightbox-source-holder">
                <Source/>
            </div>
        );
    }
}

SourceHolder.propTypes = {
    fsLightbox: PropTypes.object,
    index: PropTypes.number
};
export default SourceHolder;