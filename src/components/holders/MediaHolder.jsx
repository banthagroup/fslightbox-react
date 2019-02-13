import React, { Component } from 'react';
import SourceHolder from "../sources/SourceHolder.jsx";
import PropTypes from 'prop-types';

class MediaHolder extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const sourceHolders = [];
        for (let i = 0; i < this.props.fsLightbox.totalSlides; i++) {
            sourceHolders.push(
                <SourceHolder
                    key={ i }
                    index={ i }
                    fsLightbox={ this.props.fsLightbox }
                />
            );
        }

        return (
            <div ref={ this.props.fsLightbox.elements.mediaHolder } className="fslightbox-media-holder">
                { sourceHolders }
            </div>
        );
    }
}


MediaHolder.propTypes = {
    fsLightbox: PropTypes.object
};
export default MediaHolder;