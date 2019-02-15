import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nav from "./components/nav/Nav.jsx";
import "./css/fslightboxBasic.css";
import  CloseOpenLightbox  from "./core/CloseOpenLightbox";
import SlideButtonLeft from "./components/slideButtons/SlideButtonLeft.jsx";
import SlideButtonRight from "./components/slideButtons/SlideButtonRight.jsx";
import MediaHolder from "./components/holders/MediaHolder.jsx";
import { OnResize } from "./core/OnResize";
import { createRefsArrayForNumberOfUrls } from "./utils/Arrays/createRefsArrayForNumberOfUrls";
import { createNullArrayForNumberOfUrls } from "./utils/Arrays/createNullArrayForNumberOfUrls";
import SourceSizeAdjusterIterator from "./core/Source/SourceSizeAdjusterIterator";
import { createSourceComponentCreatorsArray } from "./utils/Arrays/createSourceComponentCreatorsArray";

class FsLightbox extends Component {

    constructor(props) {
        super(props);
        this.setData();
        this.setStates();
        this.setElements();
        this.setCore();
    }

    setData() {
        this.initialized = false;
        this.urls = this.props.urls;
        this.sourcesTypes = [];
        this.isSourceAlreadyLoaded = [];

        // slides
        this.slide = (this.props.slide) ? this.props.slide : 1;
        this.totalSlides = this.props.urls.length;

        // transforms
        this.slideDistance = (this.props.slideDistance) ? this.props.slideDistance : 1.3;

        // if lightbox will be closed during source type check we need call create source after next open
        this.sourcesToCreateOnConstruct = [];
        this.videosPosters = (this.props.videosPosters) ? this.props.videosPosters : [];

        // dimensions (integers)
        this.maxSourceWidth = 0;
        this.maxSourceHeight = 0;
        this.sourceDimensions = [];


    }

    setStates() {
        this.state = {
            isOpen: this.props.isOpen,
            slide: (this.props.slide) ? this.props.slide : 1,
        };
    }

    setElements() {
        this.elements = {
            container: React.createRef(),
            mediaHolder: React.createRef(),
            sourceHolders: createRefsArrayForNumberOfUrls(this.props.urls),
            sourcesJSXComponents: createNullArrayForNumberOfUrls(this.props.urls),
            sources: createRefsArrayForNumberOfUrls(this.props.urls),
        };
    }

    setCore() {
        this.closeOpenLightbox = new CloseOpenLightbox(this);
        this.onResize = new OnResize(this);
        this.sourceSizeAdjusterIterator = new SourceSizeAdjusterIterator(this);
        this.sourceComponentsCreators = createSourceComponentCreatorsArray(this);
        // after source load its size adjuster will be stored in this array so SourceSizeAdjusterIterator may use it
        this.sourceSizeAdjusters = [];
        this.sourceTransformers = [];
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isOpen !== this.props.isOpen) {
            (this.state.isOpen) ?
                this.closeOpenLightbox.closeLightbox() :
                this.closeOpenLightbox.openLightbox();
        }
        if (this.props.slide !== this.slide) {
            this.slide = this.props.slide;
        }
    }

    initialize() {
        this.initialized = true;
        this.onResize.init();
    }


    componentDidMount() {
        if (this.props.isOpen) {
            this.initialize();
            this.closeOpenLightbox.addOpeningClassToDocument();
        }
    }

    render() {
        if (!this.state.isOpen) return null;
        return (
            <div ref={ this.elements.container } className="fslightbox-container">
                <Nav closeLightbox={ this.closeOpenLightbox.closeLightbox }/>
                <SlideButtonLeft/>
                <SlideButtonRight/>
                <MediaHolder _={ this }/>
            </div>
        );
    }
}

FsLightbox.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    urls: PropTypes.array.isRequired,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onInit: PropTypes.func,
    onShow: PropTypes.func,

    // developer can add video poster if he wants to
    videosPosters: PropTypes.array,

    slide: PropTypes.number,

    slideDistance: PropTypes.number,
};

export default FsLightbox;