import React, { Component } from 'react';
import SourceHolder from "../sources/SourceHolder.jsx";

class MediaHolder extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div ref={this.props.fsLightbox.elements.mediaHolder} className="fslightbox-media-holder">
                <SourceHolder/>
            </div>
        );
    }
}

export default MediaHolder;