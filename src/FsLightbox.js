import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EventsThrower } from "./utils/EventsThrower";
import ToolbarButton from "./components/ToolbarButton.jsx";
import { checkIfUserIsOnMobileDevice } from "./utils/checkIfUserIsOnMobileDevice";
import Svg from "./components/Svg.jsx";
import { StageSourcesIndexes } from "./utils/StageSourcesIndexes";

class FsLightbox extends Component {

    constructor(props) {
        super(props);
        const eventsThrower = new EventsThrower(props);

        this.data = {
            slide: (this.props.slide) ? this.props.slide : 1,
            totalSlides: this.props.urls.length,
        };


        this.state = {
            slide: (this.props.slide) ? this.props.slide : 1,
            totalSlides: this.props.urls.length,
            slideDistance: (this.props.slideDistance) ? this.props.slide: 1.3,
            slideCounter: (this.props.slideCounter) ? this.props.slideCounter: true,
            slideButtons: (this.props.slideButtons) ? this.props.slideButtons: true,
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

        this.holder = React.createRef();
        this.stageSourcesIndexes = new StageSourcesIndexes(this.data);

    }

    checkIfUserIsOnMobileDevice() {
        this.setState({
            isMobile: checkIfUserIsOnMobileDevice()
        });
    }

    componentDidMount() {
        this.setState({
            totalSlides: 14
        },() => {
            this.data.slide = 12312323;
            this.stageSourcesIndexes.nextSlideIndex();
        });
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