import React, { Component } from 'react';
import FsLightbox from "../src/FsLightbox.js";
import "./css/demo.css";

class DemoComponentHiddenLightbox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
        this.toggleLightbox = this.toggleLightbox.bind(this);
    }

    toggleLightbox() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }


    callEvent() {

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
                        "../demo/images/1.jpeg",
                        "../demo/images/2.jpg",
                        "../demo/images/3.jpeg",
                    ] }
                    slide={ 1 }

                    onOpen={ this.callEvent.bind(this) }
                />
            </>
        );
    }
}

export default DemoComponentHiddenLightbox;