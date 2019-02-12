import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nav from "./components/nav/Nav.jsx";
import "./css/fslightboxBasic.css";
import { CloseOpenLightbox } from "./utils/mainComponentScope/CloseOpenLightbox";
import SlideButtonLeft from "./components/slideButtons/SlideButtonLeft.jsx";
import SlideButtonRight from "./components/slideButtons/SlideButtonRight.jsx";
import MediaHolder from "./components/holders/MediaHolder.jsx";
import { OnResize } from "./core/OnResize";
import { createRefsArrayForNumberOfUrls } from "./utils/createRefsArrayForNumberOfUrls";
import { createNullArrayForNumberOfUrls } from "./utils/createNullArrayForNumberOfUrls";

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
        this.slide = (this.props.slide) ? this.props.slide : 1;
        this.urls = this.props.urls;
        this.totalSlides = this.props.urls.length;
        this.sourcesTypes = [];
        // if lightbox will be closed during source type check we need call create source after next open
        this.sourcesToCreateOnConstruct = [];
        this.videosPosters = (this.props.videosPosters) ? this.props.videosPosters : [];
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
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isOpen !== this.props.isOpen) {
            (this.state.isOpen) ?
                this.closeOpenLightbox.closeLightbox() :
                this.closeOpenLightbox.openLightbox();
        }
    }

    initialize() {
        this.initialized = true;
        this.onResize.init();
    }


    componentDidMount() {
        if (this.props.isOpen) {
            this.initialize();
            this.closeOpenLightbox.openLightbox();
        }
    }

    render() {
        if (!this.state.isOpen) return null;
        return (
            <div ref={ this.elements.container } className="fslightbox-container">
                <Nav closeLightbox={ this.closeOpenLightbox.closeLightbox }/>
                <SlideButtonLeft/>
                <SlideButtonRight/>
                <MediaHolder fsLightbox={ this }/>
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
};

export default FsLightbox;