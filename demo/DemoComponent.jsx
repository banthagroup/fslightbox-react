import React, { Component } from 'react';
import FsLightbox from "../src/FsLightbox.js";
import "./css/demo.css";
import { testYoutubeURL } from "../tests/schemas/testSchemas";

class DemoComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: true,
        };
        this.videosPosters = [];
        this.videosPosters[0] = '../demo/images/1.jpeg';
        this.toggleLightbox = this.toggleLightbox.bind(this);
    }

    toggleLightbox() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }


    render() {
        return (
            <>
                <button onClick={ this.toggleLightbox }>Toggle Lightbox</button>
                <div className="images">
                    <img className="image" src="../demo/images/1.jpeg" alt=""/>
                    <img className="image" src="../demo/images/2.jpg" alt=""/>
                    <img className="image" src="../demo/images/3.jpeg" alt=""/>
                </div>
                <FsLightbox
                    isOpen={ this.state.isOpen }
                    urls={ [
                        //"../demo/videos/film.mp4",
                        //"../demo/images/5.jpg",
                        testYoutubeURL,
                    ] }
                    videosPosters={ this.videosPosters }
                    slide={ 1 }
                />
            </>
        );
    }
}

export default DemoComponent;