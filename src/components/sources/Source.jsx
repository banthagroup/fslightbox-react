import React, { Component } from 'react';
import { SourceFactory } from "../../core/Source/SourceFactory";
import PropTypes from 'prop-types';
import Loader from "./Loader.jsx";
import { SourceSizeAdjuster } from "../../core/Source/SourceSizeAdjuster";

class Source extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSourceLoaded: false
        };
        this.callUpdateAfterMount = false;
        if (this.props.fsLightbox.sourcesToCreateOnConstruct[this.props.index]) {
            this.callUpdateAfterMount = true;
            this.createSource();
        }
        this.onSourceLoad = this.onSourceLoad.bind(this);
    }

    createSource() {
        const sourceFactory = new SourceFactory(this.props.fsLightbox);
        sourceFactory.createSourceForIndex(this.props.index);
        sourceFactory.attachOnSourceLoad(this.onSourceLoad);
        this.props.fsLightbox.elements.sourcesJSXComponents[this.props.index]
            = sourceFactory.getSource();
        if (!this.callUpdateAfterMount)
            this.forceUpdate();
    }

    componentDidMount() {
        if (this.callUpdateAfterMount)
            this.forceUpdate();
    }

    onSourceLoad() {
        this.setState({
            isSourceLoaded: true
        });
        const sourceSizeAdjuster = new SourceSizeAdjuster(this.props.fsLightbox);
        sourceSizeAdjuster.setUpSourceByIndex(this.props.index);
        this.props.fsLightbox.sourceSizeAdjusters[this.props.index] = sourceSizeAdjuster;
    }


    render() {
        const loader = (this.state.isSourceLoaded) ? null : <Loader/>;
        return (
            <>
                { loader }
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