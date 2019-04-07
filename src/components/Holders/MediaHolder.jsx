import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SourceHolder from "../Sources/SourceHolder.jsx";
import { CURSOR_GRABBING_CLASS_NAME } from "../../constants/CssConstants";

class MediaHolder extends Component {
    render() {
        const sourceHolders = [];
        for (let i = 0; i < this.props.fsLightbox.data.totalSlides; i++) {
            sourceHolders.push(
                <SourceHolder
                    fsLightbox={ this.props.fsLightbox }
                    i={ i }
                    key={ i }
                />
            );
        }

        const cursorGrabbingClass = this.props.fsLightbox.state.isSwipingSlides ? CURSOR_GRABBING_CLASS_NAME : '';

        return (
            <div className={ 'fslightbox-media-holder ' + cursorGrabbingClass }
                 onMouseDown={ this.props.fsLightbox.core.slideSwiping.down.listener }
                 onTouchStart={ this.props.fsLightbox.core.slideSwiping.down.listener }
                 ref={ this.props.fsLightbox.elements.mediaHolder }>
                { sourceHolders }
            </div>
        );
    }
}

MediaHolder.propTypes = {
    fsLightbox: PropTypes.object.isRequired,
};

export default MediaHolder;