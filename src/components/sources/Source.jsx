import React, { Component } from 'react';
import { SourceFactory } from "../../core/Source/SourceFactory";
import PropTypes from 'prop-types';
import Loader from "./Loader.jsx";

class Source extends Component {

    constructor(props) {
        super(props);
        this.callUpdateAfterMount = false;
        this.isLoaderVisible = true;
        if (this.props._.sourcesToCreateOnConstruct[this.props.i]) {
            this.callUpdateAfterMount = true;
            this.createSource();
        }
        this.onFirstSourceLoad = this.onFirstSourceLoad.bind(this);
    }

    createSource() {
        this.isLoaderVisible = false;
        const sourceFactory = new SourceFactory(this.props._);
        sourceFactory.createSourceForIndex(this.props.i);
        sourceFactory.attachOnFirstSourceLoad(this.onFirstSourceLoad);
        this.props._.elements.sourcesJSXComponents[this.props.i] = sourceFactory.getSource();
        if (!this.callUpdateAfterMount) {
            this.sourceWasCreated();
        }
    }

    sourceWasCreated() {
        // after that refresh source stored in sourcesJSXComponents is attached so we can access refs
        this.forceUpdate();
        this.props._.sourceComponentsCreators[this.props.i].createSourceTransformer();
    }

    componentDidMount() {
        if (this.callUpdateAfterMount) {
            this.sourceWasCreated();
        }
        // if source was already loaded we need to call onSourceLoad after component mount
        if (this.props._.isSourceAlreadyLoaded[this.props.i]) {
            this.onSourceLoad();
        }
    }


    onFirstSourceLoad() {
        this.props._.isSourceAlreadyLoaded[this.props.i] = true;
        // we are creating source size adjuster after first load because we need already source dimensions
        this.props._.sourceComponentsCreators[this.props.i].createSourceSizeAdjuster();
        this.onSourceLoad();
    }

    onSourceLoad() {
        this.props._.elements.sources[this.props.i].current.classList.add('fslightbox-fade-in-class');
        this.props._.sourceSizeAdjusters[this.props.i].adjustSourceSize();
        this.props._.sourceTransformers[this.props.i].transform();
    }


    render() {
        const loader = (this.props._.isSourceAlreadyLoaded[this.props.i] ||
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
    i: PropTypes.number.isRequired,
};
export default Source;