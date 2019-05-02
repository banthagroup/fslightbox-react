import React, { Component } from 'react';
import "./css/demo.css";
import FsLightbox from '../src/FsLightbox.jsx';
import { TEST_YOUTUBE_URL, testVideoURL, testYoutubeURL } from "./demoData";

class DemoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            slide: 1
        };
        this.toggleLightbox = this.toggleLightbox.bind(this);
    }

    toggleLightbox() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <>
                <button onClick={ this.toggleLightbox }>
                    Toggle Lightbox
                </button>
                <div className="images">
                    <img className="image" src="../demo/images/1.jpeg" alt=""/>
                    <img className="image" src="../demo/images/2.jpg" alt=""/>
                    <img className="image" src="../demo/images/3.jpeg" alt=""/>
                </div>
                <div style={ { width: '100%', height: '100vh' } }>
                </div>
                <FsLightbox
                    isOpen={ this.state.isOpen }
                    urls={ [
                        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
                        // "invalid",
                        TEST_YOUTUBE_URL,
                        // testVideoURL,
                        "https://images.pexels.com/photos/2118563/pexels-photo-2118563.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                        "../demo/images/2.jpg",
                        "../demo/images/3.jpeg",
                        // "../demo/images/4.jpeg",
                        // "../demo/images/5.jpg",
                        // "../demo/images/6.jpg",
                        // "../demo/images/7.jpg",
                        // "../demo/images/6.jpg"
                    ] }
                    slide={ this.state.slide }
                    videosPosters={ [
                        // "../demo/images/1.jpeg"
                    ] }
                    onClose={ () => console.log('onClose') }
                    onInit={ () => console.log('onInit') }
                    onOpen={ () => console.log('onOpen') }
                    onShow={ () => console.log('onShow') }
                />
            </>
        );
    }
}

export default DemoComponent;