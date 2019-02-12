import React, { Component } from 'react';
import { SourceFactory } from "../../core/SourceFactory";
import PropTypes from 'prop-types';

class Source extends Component {

    constructor(props) {
        super(props);
        this.callUpdate = true;
        if (this.props.fsLightbox.sourcesToCreateOnConstruct[this.props.index]) {
            this.callUpdate = false;
            this.createSource();
        }
    }

    createSource() {
        const sourceFactory = new SourceFactory(this.props.fsLightbox);
        sourceFactory.createSourceForIndex(this.props.index);
        this.props.fsLightbox.elements.sourcesJSXComponents[this.props.index]
            = sourceFactory.getSource();
        if (this.callUpdate)
            this.forceUpdate();
    }

    render() {
        return (
            <>
                { this.props.fsLightbox.elements.sourcesJSXComponents[this.props.index] }
            </>
        );
    }
}

Source.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
};
export default Source;