import React, { Component } from 'react';
import { SourceFactory } from "../../core/Source/SourceFactory";
import PropTypes from 'prop-types';
import Loader from "./Loader.jsx";
import { SourceSizeAdjuster } from "../../core/Source/SourceSizeAdjuster";

class Source extends Component {

    constructor(props) {
        super(props);
        this.callUpdateAfterMount = false;
        this.isLoaderVisible = true;
        if (this.props.fsLightbox.sourcesToCreateOnConstruct[this.props.index]) {
            this.callUpdateAfterMount = true;
            this.createSource();
        }
        this.onFirstSourceLoad = this.onFirstSourceLoad.bind(this);
    }

    createSource() {
        this.isLoaderVisible = false;
        const sourceFactory = new SourceFactory(this.props.fsLightbox);
        sourceFactory.createSourceForIndex(this.props.index);
        sourceFactory.attachOnFirstSourceLoad(this.onFirstSourceLoad);
        this.props.fsLightbox.elements.sourcesJSXComponents[this.props.index] = sourceFactory.getSource();
        if (!this.callUpdateAfterMount) {
            this.forceUpdate();
        }
    }

    componentDidMount() {
        if (this.callUpdateAfterMount) {
            this.forceUpdate();
        }
        // if source was already loaded we need to call onSourceLoad after component mount
        if (this.props.fsLightbox.isSourceAlreadyLoaded[this.props.index]) {
            this.onSourceLoad();
        }
    }


    onFirstSourceLoad() {
        this.props.fsLightbox.isSourceAlreadyLoaded[this.props.index] = true;
        this.createSourceSizeAdjuster();
        this.onSourceLoad();
    }

    createSourceSizeAdjuster() {
        const sourceSizeAdjuster = new SourceSizeAdjuster(this.props.fsLightbox);
        sourceSizeAdjuster.setIndex(this.props.index);
        this.props.fsLightbox.sourceSizeAdjusters[this.props.index] = sourceSizeAdjuster;
    }

    onSourceLoad() {
        this.props.fsLightbox.elements.sources[this.props.index].current.classList.add('fslightbox-fade-in-class');
        this.props.fsLightbox.sourceSizeAdjusters[this.props.index].updateSource();
        this.props.fsLightbox.sourceSizeAdjusters[this.props.index].adjustSourceSize();
    }


    render() {
        const loader = (this.props.fsLightbox.isSourceAlreadyLoaded[this.props.index] ||
            !this.isLoaderVisible) ?
            null : <Loader/>;

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