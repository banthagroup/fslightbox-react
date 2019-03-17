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
        this.setInfo();
        this.setStates();
        this.setElements();
        this.setCollections();
        this.setCore();
    }

    setData() {
        this.urls = this.props.urls;
        this.sourcesTypes = [];
        this.isSourceAlreadyLoaded = [];

        // slides
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

    setInfo() {
        this.info = {
            isFullscreenOpen: false,
            isInitialized: false
        }
    }

    setStates() {
        this.state = {
            isOpen: this.props.isOpen,
            slide: (this.props.slide) ? this.props.slide : 1
        }
    }

    setElements() {
        this.elements = {
            container: React.createRef(),
            mediaHolder: React.createRef(),
            sources: createRefsArrayForNumberOfUrls(this.props.urls),
            sourceHolders: createRefsArrayForNumberOfUrls(this.props.urls),
            sourcesJSXComponents: createNullArrayForNumberOfUrls(this.props.urls),
        };
    }

    setCore() {
        this.core = {
            closeOpenLightbox: new CloseOpenLightbox(this),
            fullscreenToggler: new FullscreenToggler(this),
            onResize: new OnResize(this),
            slideChanger: new SlideChanger(this),
            stageSources: new StageSources(this),
            sourceAnimator: new SourceAnimator(this),
            sourceHoldersTransformer: new SourceHoldersTransformer(this),
            sourceSizeAdjusterIterator: new SourceSizeAdjusterIterator(this)
        };
    }

    setCollections() {
        this.collections = {
            // after source load its size adjuster will be stored in this array so SourceSizeAdjusterIterator may use it
            sourceSizeAdjusters: []
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isOpen !== this.props.isOpen) {
            (this.state.isOpen) ?
                this.core.closeOpenLightbox.closeLightbox() :
                this.core.closeOpenLightbox.openLightbox();
        }
        if (prevProps.slide !== this.props.slide) {
            this.core.slideChanger.changeSlideTo(this.props.slide);
        }
    }

    initialize() {
        this.info.isInitialized = true;
        this.core.onResize.init();
        this.core.sourceHoldersTransformer.transformStageSources().withoutTimeout();
    }


    componentDidMount() {
        if (this.props.isOpen) {
            this.initialize();
            this.core.closeOpenLightbox.addOpeningClassToDocument();
        }
    }

    render() {
        if (!this.state.isOpen) return null;
        return (
            <div ref={ this.elements.container } className="fslightbox-container">
                <Nav fsLightbox={ this }/>
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