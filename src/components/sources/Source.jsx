import React, { Component } from 'react';
import { SourceFactory } from "../../core/SourceFactory";
import PropTypes from 'prop-types';

class Source extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sourceElement: null
        };
    }

    createSource() {
        this.sourceFactory = new SourceFactory(this.props.fsLightbox);
        this.sourceFactory.setSourceIndex(this.props.index);
        this.sourceFactory.createSource();
        this.setState({
            sourceElement: this.sourceFactory.getSource()
        });
    }

    render() {
        return (
            <>
                { this.state.sourceElement }
            </>
        );
    }
}

Source.propTypes = {
    fsLightbox: PropTypes.object,
    index: PropTypes.number,
};
export default Source;