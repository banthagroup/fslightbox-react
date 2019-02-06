import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EventsThrower } from "./utils/EventsThrower";
import ToolbarButton from "./components/ToolbarButton.jsx";

class FsLightbox extends Component {

    constructor(props) {
        super(props);
        const eventsThrower = new EventsThrower(props);

        this.state = {
            slide: 1,
            total_slides: 1,
            slideDistance: 1.3,
            slideCounter: true,
            slideButtons: true,
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
    }

    render() {
        return (
            <div>
                {this.props.urls}
                <ToolbarButton/>
            </div>
        );
    }
}

FsLightbox.propTypes = {
    urls: PropTypes.array.isRequired,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onInit: PropTypes.func,
    onShow: PropTypes.func,
};

export default FsLightbox;