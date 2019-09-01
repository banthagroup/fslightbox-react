import React, { Component } from 'react';
import '../src/scss/FsLightbox.scss';
import "./css/demo.css";
import FsLightbox from '../src/FsLightbox.jsx';
import { TEST_YOUTUBE_URL, TEST_VIDEO_URL } from "./demoData";
import { FLEX_CENTERED_CLASS_NAME, FULL_DIMENSION_CLASS_NAME } from "../src/constants/classes-names";

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
            "../demo/images/5.jpg",
            TEST_YOUTUBE_URL,
            TEST_VIDEO_URL,
            "../demo/images/3.jpeg",
            'invalid'
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
                    <img className="image" src="../demo/images/1.jpeg" alt="" />
                    <img className="image" src="../demo/images/2.jpg" alt="" />
                    <img className="image" src="../demo/images/3.jpeg" alt="" />
                </div>
                <FsLightbox
                    toggler={ this.state.toggler }
                    slide={ this.state.slide }
                    source={ this.state.source }
                    sourceIndex={ this.state.sourceIndex }
                    sources={ sources }
                    openOnMount={ true }
                    customSources={ [
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        <iframe src="https://player.vimeo.com/video/353010302"
                                frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
                    ] }
                    customSourcesGlobalMaxDimensions={ { width: 1920, height: 1080 } }
                    videosPosters={ [
                        null,
                        null,
                        null,
                        "../demo/images/1.jpeg"
                    ] }
                />
                <FsLightbox toggler={ this.state.toggler2 } sources={ ["../demo/images/5.jpg"] } />
            </>
        );
    }
}

export default DemoComponent;
