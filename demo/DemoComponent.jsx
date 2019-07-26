import React, { Component, useState } from 'react';
import "./css/demo.css";
import FsLightbox from '../src/FsLightbox.jsx';
import { TEST_YOUTUBE_URL, TEST_VIDEO_URL } from "./demoData";

class DemoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggler: true,
            toggler2: false,
            updated: true,
            slide: 1,
            source: '',
            sourceIndex: 0
        };
        this.toggleLightbox = this.toggleLightbox.bind(this);
        this.toggleLightboxSecond = this.toggleLightboxSecond.bind(this);
    }

    toggleLightbox() {
        this.setState({
            toggler: !this.state.toggler
        });
    }
    toggleLightboxSecond() {
        this.setState({
            toggler2: !this.state.toggler2
        });
    }

    render() {
        const sources = [
            TEST_YOUTUBE_URL,
            TEST_VIDEO_URL,
            'https://unsplash.com/photos/WWVD4wXRX38/download?force=true',
            'https://unsplash.com/photos/WWVD4wXRX38/download?force=true',
            'https://unsplash.com/photos/WWVD4wXRX38/download?force=true',
            "../demo/images/3.jpeg"
        ];

        return (
            <>
                <button onClick={ this.toggleLightbox }>
                    Toggle Lightbox
                </button>
                <button onClick={ this.toggleLightboxSecond }>
                    Toggle Lightbox
                </button>
                <div className="images">
                    <img className="image" src="../demo/images/1.jpeg" alt=""/>
                    <img className="image" src="../demo/images/2.jpg" alt=""/>
                    <img className="image" src="../demo/images/3.jpeg" alt=""/>
                </div>
                <FsLightbox
                    toggler={ this.state.toggler }
                    slide={ this.state.slide }
                    source={ this.state.source }
                    sourceIndex={ this.state.sourceIndex }
                    sources={ sources }
                    openOnMount={ true }
                    videosPosters={ [
                        null,
                        null,
                        null,
                        "../demo/images/1.jpeg"
                    ] }
                    // onClose={ () => console.log('onClose') }
                    // onInit={ () => console.log('onInit') }
                    // onOpen={ () => console.log('onOpen') }
                    // onShow={ () => console.log('onShow') }
                />
                <FsLightbox toggler={ this.state.toggler2 } sources={ ["../demo/images/5.jpg"] }/>
            </>
        );
    }
}

export default DemoComponent;
