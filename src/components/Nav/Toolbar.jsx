import React, { Component } from 'react';
import PropTypes from "prop-types";
import ToolbarButton from "./ToolbarButton.jsx";


class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.fullscreen = this.fullscreen.bind(this);
        this.state = { isFullscreenOpen: false };
        if (!props.fsLightbox.data.isToolbarCoreInitialized) {
            this.initializeToolbarCore();
        }
    }

    initializeToolbarCore() {
        this.props.fsLightbox.getters.getIsFullscreenOpen = () => this.state.isFullscreenOpen;
        this.props.fsLightbox.core.fullscreenToggler.setToolbar(this);
        this.props.fsLightbox.data.isToolbarCoreInitialized = false;
    }

    fullscreen() {
        (this.state.isFullscreenOpen) ?
            this.props.fsLightbox.core.fullscreenToggler.turnOffFullscreen() :
            this.props.fsLightbox.core.fullscreenToggler.turnOnFullscreen();
    }

    close() {
        this.props.fsLightbox.core.closeOpenLightbox.closeLightbox();
    }

    render() {
        return (
            <div className="fslightbox-toolbar">
                <ToolbarButton
                    onClick={ this.fullscreen }
                    viewBox={ (this.state.isFullscreenOpen) ?
                        "0 0 950 1024" :
                        "0 0 18 18"
                    }
                    size={ (this.state.isFullscreenOpen) ?
                        "1.5em" :
                        "1.25em"
                    }
                    d={ (this.state.isFullscreenOpen) ?
                        "M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z" :
                        "M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z"
                    }
                    title="Fullscreen"
                />
                <ToolbarButton
                    onClick={ this.close }
                    viewBox="0 0 24 24"
                    size="1.25em"
                    d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"
                    title="Close"
                />
            </div>
        );
    }
}

Toolbar.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
};

export default Toolbar;