import React, { Component } from 'react';
import SourceHolder from "../sources/SourceHolder.jsx";
import PropTypes from 'prop-types';

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
        return (
            <div ref={ this.props.elements.mediaHolder } className="fslightbox-media-holder">
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
    slide: PropTypes.number.isRequired,
    sourcesData: PropTypes.object.isRequired
};
export default MediaHolder;