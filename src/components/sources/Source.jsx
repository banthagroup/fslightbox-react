import React, { Component } from 'react';
import { SourceFactory } from "../../core/Source/SourceFactory";
import PropTypes from 'prop-types';
import Loader from "./Loader.jsx";
import { SourceSizeAdjuster } from "../../core/Source/SourceSizeAdjuster";
import { FADE_IN_CLASS_NAME, FADE_IN_COMPLETE_CLASS_NAME } from "../../constants/CssConstants";


let isLoaderVisible;
let shouldCallUpdateAfterMount;

class Source extends Component {
    constructor(props) {
        super(props);
        shouldCallUpdateAfterMount = false;
        isLoaderVisible = true;
        // request succeeded when lightbox was closed
        if (this.props.sourcesData.sourcesToCreateOnConstruct[this.props.i]) {
            shouldCallUpdateAfterMount = true;
            this.createSource();
        }
        this.onFirstSourceLoad = this.onFirstSourceLoad.bind(this);
    }

    createSource() {
        isLoaderVisible = false;
        const sourceFactory = new SourceFactory(this.props);
        sourceFactory.attachOnFirstSourceLoad(this.onFirstSourceLoad);
        sourceFactory.setSourceIndex(this.props.i);
        this.props.elements.sourcesJSXComponents[this.props.i] = sourceFactory.getSourceComponent();
        if (!shouldCallUpdateAfterMount) {
            this.sourceWasCreated();
        }
    }

    sourceWasCreated() {
        // after that refresh source stored in sourcesJSXComponents is attached so we can access refs
        this.forceUpdate();
    }

    componentDidMount() {
        if (shouldCallUpdateAfterMount) {
            this.sourceWasCreated();
        }
        // if source was already loaded we need to call onSourceLoad after component mount
        if (this.props.sourcesData.isSourceAlreadyLoadedArray[this.props.i]) {
            this.onSourceLoad();
        }
    }


    onFirstSourceLoad() {
        this.props.sourcesData.isSourceAlreadyLoadedArray[this.props.i] = true;
        // we are creating source size adjuster after first load because we need already source dimensions
        const sourceSizeAdjuster = new SourceSizeAdjuster(this.props);
        sourceSizeAdjuster.setIndex(this.props.i);
        this.props.collections.sourceSizeAdjusters[this.props.i] = sourceSizeAdjuster;
        this.onSourceLoad();
    }

    onSourceLoad() {
        this.fadeInSource();
        // source size adjuster may be not set if source is invalid
        if (this.props.collections.sourceSizeAdjusters[this.props.i])
            this.props.collections.sourceSizeAdjusters[this.props.i].adjustSourceSize();
    }


    fadeInSource() {
        // we are fading in source only if it's in stage
        if (!this.props.core.stageSources.isSourceInStage(this.props.i))
            return;


        // we will add longer fade-in for better UX
        if (this.props.i === this.props.slide - 1) {
            this.props.elements.sources[this.props.i].current.classList.add(FADE_IN_COMPLETE_CLASS_NAME)
        } else {
            this.props.elements.sources[this.props.i].current.classList.add(FADE_IN_CLASS_NAME);
        }
    }


    render() {
        const loader = (this.props.sourcesData.isSourceAlreadyLoadedArray[this.props.i] ||
            !isLoaderVisible) ?
            null : <Loader/>;

        return (
            <>
                { loader }
                { this.props.elements.sourcesJSXComponents[this.props.i] }
            </>
        );
    }
}


Source.propTypes = {
    i: PropTypes.number.isRequired,
    collections: PropTypes.object.isRequired,
    core: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    elements: PropTypes.object.isRequired,
    slide: PropTypes.number.isRequired,
    sourcesData: PropTypes.object.isRequired
};
export default Source;