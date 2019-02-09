import React, { Component } from 'react';
import MediaHolder from "./MediaHolder.jsx";

class HolderWrapper extends Component {
    render() {
        return (
            <div className="fslightbox-holder-wrapper">
                <MediaHolder/>
            </div>
        );
    }
}

export default HolderWrapper;