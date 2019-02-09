import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { checkIfUserIsOnMobileDevice } from "./utils/checkIfUserIsOnMobileDevice";
import Nav from "./components/nav/Nav.jsx";
import "./css/fslightboxBasic.css";
import { CloseOpenLightbox } from "./utils/mainComponentScope/CloseOpenLightbox";
import SlideButtonLeft from "./components/slideButtons/SlideButtonLeft.jsx";
import SlideButtonRight from "./components/slideButtons/SlideButtonRight.jsx";
import MediaHolder from "./components/holders/MediaHolder.jsx";
import { OnResize } from "./core/OnResize";

class FsLightbox extends Component {

    constructor(props) {
        super(props);

        this.slide = (this.props.slide) ? this.props.slide : 1;
        this.totalSlides = this.props.urls.length;
        this.initialized = false;

        this.state = {
            isOpen: this.props.isOpen,
            slide: (this.props.slide) ? this.props.slide : 1,
        };

        this.elements = {
            mediaHolder: React.createRef(),
        };

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


    checkIfUserIsOnMobileDevice() {
        this.setState({
            isMobile: checkIfUserIsOnMobileDevice()
        });
    }

    componentDidMount() {
        if (this.props.isOpen) {
            this.initialize();
        }
    }


    render() {
        if (!this.state.isOpen) return null;
        return (
            <div className="fslightbox-container">
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
};

export default FsLightbox;