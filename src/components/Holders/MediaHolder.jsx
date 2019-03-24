import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SourceHolder from "../Sources/SourceHolder.jsx";
import { CURSOR_GRABBING_CLASS_NAME } from "../../constants/CssConstants";

class MediaHolder extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const sourceHolders = [];
        for (let i = 0; i < this.props.data.totalSlides; i++) {
            sourceHolders.push(
                <SourceHolder
                    key={ i }
                    i={ i }
                    collections={ this.props.collections }
                    core={ this.props.core }
                    data={ this.props.data }
                    elements={ this.props.elements }
                    slide={ this.props.slide }
                    sourcesData={ this.props.sourcesData }
                />
            );
        }

        const cursorGrabbingClass = this.props.isSwipingSlides ? CURSOR_GRABBING_CLASS_NAME : '';

        return (
            <div className={ 'fslightbox-media-holder ' + cursorGrabbingClass }
                 onMouseDown={ this.props.core.slideSwiping.down.listener }
                 onTouchStart={ this.props.core.slideSwiping.down.listener }
                 ref={ this.props.elements.mediaHolder }>
                { sourceHolders }
            </div>
        );
    }
}


MediaHolder.propTypes = {
    collections: PropTypes.object.isRequired,
    core: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    elements: PropTypes.object.isRequired,
    isSwipingSlides: PropTypes.bool.isRequired,
    slide: PropTypes.number.isRequired,
    sourcesData: PropTypes.object.isRequired
};
export default MediaHolder;