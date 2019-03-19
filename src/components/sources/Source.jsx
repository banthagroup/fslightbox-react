import React, { Component } from 'react';
import { SourceFactory } from "../../core/Source/SourceFactory";
import PropTypes from 'prop-types';
import Loader from "./Loader.jsx";
import { SourceSizeAdjuster } from "../../core/Source/SourceSizeAdjuster";
import { FADE_IN_CLASS_NAME, FADE_IN_COMPLETE_CLASS_NAME } from "../../constants/CssConstants";

class Source extends Component {

    constructor(props) {
        super(props);
        this.callUpdateAfterMount = false;
        this.isLoaderVisible = true;
        if (this.props._.sourcesData.sourcesToCreateOnConstruct[this.props.i]) {
            this.callUpdateAfterMount = true;
            this.createSource();
        }
        this.onFirstSourceLoad = this.onFirstSourceLoad.bind(this);
    }

    createSource() {
        this.isLoaderVisible = false;
        const sourceFactory = new SourceFactory(this.props._);
        sourceFactory.attachOnFirstSourceLoad(this.onFirstSourceLoad);
        sourceFactory.setSourceIndex(this.props.i);
        this.props._.elements.sourcesJSXComponents[this.props.i] = sourceFactory.getSourceComponent();
        if (!this.callUpdateAfterMount) {
            this.sourceWasCreated();
        }
    }

    sourceWasCreated() {
        // after that refresh source stored in sourcesJSXComponents is attached so we can access refs
        this.forceUpdate();
    }

    componentDidMount() {
        if (this.callUpdateAfterMount) {
            this.sourceWasCreated();
        }
        // if source was already loaded we need to call onSourceLoad after component mount
        if (this.props._.sourcesData.isSourceAlreadyLoadedArray[this.props.i]) {
            this.onSourceLoad();
        }
    }


    onFirstSourceLoad() {
        this.props._.sourcesData.isSourceAlreadyLoadedArray[this.props.i] = true;
        // we are creating source size adjuster after first load because we need already source dimensions
        const sourceSizeAdjuster = new SourceSizeAdjuster(this.props._);
        sourceSizeAdjuster.setIndex(this.props.i);
        this.props._.collections.sourceSizeAdjusters[this.props.i] = sourceSizeAdjuster;
        this.onSourceLoad();
    }

    onSourceLoad() {
        this.fadeInSource();
        // source size adjuster may be not set if source is invalid
        if (this.props._.collections.sourceSizeAdjusters[this.props.i])
            this.props._.collections.sourceSizeAdjusters[this.props.i].adjustSourceSize();
    }


    fadeInSource() {
        // we are fading in source only if it's in stage
        if (!this.props._.core.stageSources.isSourceInStage(this.props.i))
            return;

        // we will add longer fade-in for better UX
        (this.props.i === this.props._.state.slide - 1) ?
            this.props._.elements.sources[this.props.i].current.classList.add(FADE_IN_COMPLETE_CLASS_NAME) :
            this.props._.elements.sources[this.props.i].current.classList.add(FADE_IN_CLASS_NAME);
    }


    render() {
        const loader = (this.props._.sourcesData.isSourceAlreadyLoadedArray[this.props.i] ||
            !this.isLoaderVisible) ?
            null : <Loader/>;

        return (
            <>
                { loader }
                { this.props._.elements.sourcesJSXComponents[this.props.i] }
            </>
        );
    }
}


Source.propTypes = {
    _: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired
};
export default Source;