import React, { Component } from 'react';
import PropTypes from "prop-types";
import ToolbarButton from "./ToolbarButton.jsx";


class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.fullscreen = this.fullscreen.bind(this);
    }
// TODO : TOGGGLING FULLSCREEN ICON
    // TODO : D: M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z
    // TODO: VIEWBOX 1024

    fullscreen() {
        (this.props.data.isFullscreenOpen) ?
            this.props.core.fullscreenToggler.turnOffFullscreen():
            this.props.core.fullscreenToggler.turnOnFullscreen();
    }

    close() {
        this.props.core.closeOpenLightbox.closeLightbox();
    }

    render() {
        return (
            <div className="fslightbox-toolbar">
                <ToolbarButton
                    onClick={ this.fullscreen }
                    viewBox="0 0 17.5 17.5"
                    size="1.25em"
                    d="M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z"/>
                <ToolbarButton
                    onClick={ this.close }
                    viewBox="0 0 24 24"
                    size="1.25em"
                    d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/>
            </div>
        );
    }
}

Toolbar.propTypes = {
    core: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
};

export default Toolbar;