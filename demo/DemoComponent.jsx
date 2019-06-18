import React, { Component } from 'react';
import "./css/demo.css";
import FsLightbox from '../src/FsLightbox.jsx';
import { TEST_YOUTUBE_URL, TEST_VIDEO_URL } from "./demoData";

class DemoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggler: true,
            toggler2: false,
            updated: true
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
                    sources={ [
                        '../demo/images/5.jpg',
                        'https://escalante-mkt-imgs.s3-us-west-2.amazonaws.com/TimeSheets/screenshot1.png',
                        // "invalid",
                        TEST_YOUTUBE_URL,
                        TEST_VIDEO_URL,
                        "https://images.pexels.com/photos/2118563/pexels-photo-2118563.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                        "../demo/images/3.jpeg"
                    ] }
                    types={ [
                        'image',
                        'image'
                    ] }
                    videosPosters={ [
                        null,
                        null,
                        null,
                        "../demo/images/1.jpeg"
                    ] }
                    disableLocalStorage={ true }
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
