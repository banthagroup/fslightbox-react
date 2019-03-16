import React, { Component } from 'react';
import SourceHolder from "../sources/SourceHolder.jsx";
import PropTypes from 'prop-types';

class MediaHolder extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const sourceHolders = [];
        for (let i = 0; i < this.props._.totalSlides; i++) {
            sourceHolders.push(
                <SourceHolder
                    key={ i }
                    i={ i }
                    _={ this.props._ }
                />
            );
        }
        return (
            <div ref={ this.props._.elements.mediaHolder } className="fslightbox-media-holder">
                { sourceHolders }
            </div>
        );
    }
}


MediaHolder.propTypes = {
    _: PropTypes.object
};
export default MediaHolder;