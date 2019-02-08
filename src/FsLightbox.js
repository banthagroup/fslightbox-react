import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { checkIfUserIsOnMobileDevice } from "./utils/checkIfUserIsOnMobileDevice";
import Nav from "./components/nav/Nav.jsx";
import "./css/fslightboxBasic.css";
import { CloseOpenLightbox } from "./utils/mainComponentScope/CloseOpenLightbox";
import SlideButtonLeft from "./components/slideButtons/SlideButtonLeft.jsx";
import SlideButtonRight from "./components/slideButtons/SlideButtonRight.jsx";

class FsLightbox extends Component {

    constructor(props) {
        super(props);

        this.data = {
            slide: (this.props.slide) ? this.props.slide : 1,
            totalSlides: this.props.urls.length,
        };

        this.state = {
            isOpen: this.props.isOpen,
            slide: (this.props.slide) ? this.props.slide : 1,
            totalSlides: this.props.urls.length,
            slideDistance: (this.props.slideDistance) ? this.props.slide : 1.3,
            slideCounter: (this.props.slideCounter) ? this.props.slideCounter : true,
            slideButtons: (this.props.slideButtons) ? this.props.slideButtons : true,
            isFirstTimeLoad: false,
            moveSlidesViaDrag: true,
            toolbarButtons: {
                "close": true,
                "fullscreen": true
            },

            isMobile: false,

            urls: [],
            sources: [],
            sourcesLoaded: [],
            rememberedSourcesDimensions: [],
            videos: [],
            videosPosters: [],

            holderWrapper: {},
            mediaHolder: {},
            nav: {},
            toolbar: {},
            slideCounterElem: {},

            initiated: false,
            fullscreen: false,
            fadingOut: false,

            onResizeEvent: {},
        };

        this.closeOpenLightbox = new CloseOpenLightbox(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isOpen !== this.props.isOpen) {
            (this.state.isOpen) ?
                this.closeOpenLightbox.closeLightbox():
                this.closeOpenLightbox.openLightbox();
        }
    }

    checkIfUserIsOnMobileDevice() {
        this.setState({
            isMobile: checkIfUserIsOnMobileDevice()
        });
    }

    render() {
        if (!this.state.isOpen) return null;
        return (
            <div className="fslightbox-container">
                <Nav closeLightbox={ this.closeOpenLightbox.closeLightbox }/>
                <SlideButtonLeft/>
                <SlideButtonRight/>
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