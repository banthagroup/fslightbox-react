import React, { Component } from 'react';
import Source from "./Source.jsx";
import PropTypes from 'prop-types';
import SourceTypeChecker  from "../../core/SourceTypeChecker";

class SourceHolder extends Component {
    constructor(props) {
        super(props);
        this.initRequest();
    }

    initRequest() {
        const httpRequester = new SourceTypeChecker();
        httpRequester.setUrlToCheck(this.props.fsLightbox.urls[this.props.index]);
        httpRequester.getSourceType().then(() => {

        });
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