import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nav from "./components/nav/Nav.jsx";
import "./css/fslightboxBasic.css";
import CloseOpenLightbox from "./core/CloseOpenLightbox";
import SlideButtonLeft from "./components/slideButtons/SlideButtonLeft.jsx";
import SlideButtonRight from "./components/slideButtons/SlideButtonRight.jsx";
import MediaHolder from "./components/holders/MediaHolder.jsx";
import { OnResize } from "./core/OnResize";
import { createRefsArrayForNumberOfUrls } from "./utils/Arrays/createRefsArrayForNumberOfUrls";
import { createNullArrayForNumberOfUrls } from "./utils/Arrays/createNullArrayForNumberOfUrls";
import SourceSizeAdjusterIterator from "./core/Source/SourceSizeAdjusterIterator";
import { StageSources } from "./core/Stage/StageSources";
import { SourceHoldersTransformer } from "./core/Transforms/SourceHoldersTransformer";
import { SlideChanger } from "./core/Slide/SlideChanger";
import { SourceAnimator } from "./core/Animations/SourceAnimator";
import { FullscreenToggler } from "./core/Fullscreen/FullscreenToggler";

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

        this.isMobile = false;
        this.isFullscreenOpen = false;

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

        //sources
        this.sourceSizeAdjusterIterator = new SourceSizeAdjusterIterator(this);
        // after source load its size adjuster will be stored in this array so SourceSizeAdjusterIterator may use it
        this.sourceSizeAdjusters = [];

        //transform
        this.sourceHoldersTransformer = new SourceHoldersTransformer(this);

        //stage
        this.stageSources = new StageSources(this);

        //slides
        this.slideChanger = new SlideChanger(this);

        //animations
        this.sourceAnimator = new SourceAnimator(this);

        //toolbar
        this.fullscreenToggler = new FullscreenToggler(this);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isOpen !== this.props.isOpen) {
            (this.state.isOpen) ?
                this.closeOpenLightbox.closeLightbox() :
                this.closeOpenLightbox.openLightbox();
        }
        if (prevProps.slide !== this.props.slide) {
            this.slideChanger.changeSlide(this.props.slide);
        }
    }

    initialize() {
        this.initialized = true;
        this.onResize.init();
        this.sourceHoldersTransformer.transformStageSources().withoutTimeout();
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
                <Nav _={ this }/>
                <SlideButtonLeft _={ this }/>
                <SlideButtonRight _={ this }/>
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