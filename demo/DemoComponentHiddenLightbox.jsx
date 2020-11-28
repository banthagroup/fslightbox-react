import React, { Component } from 'react';
import FsLightbox from "../src/FsLightbox.jsx";
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
            toggler: !this.state.toggler
        })
    }


    callEvent() {

    }


    render() {
        return (
            <>
                <button onClick={ this.toggleLightbox }>Toggle Lightbox</button>
                <div className="images">
                    <img className="image" src="img/1.jpeg" alt=""/>
                    <img className="image" src="img/2.jpg" alt=""/>
                    <img className="image" src="img/3.jpeg" alt=""/>
                </div>
                <FsLightbox
                    isOpen={ this.state.toggler }
                    sources={ [
                        "../demo/img/1.jpeg",
                        "../demo/img/2.jpg",
                        "../demo/img/3.jpeg",
                    ] }
                    slide={ 1 }

                    onOpen={ this.callEvent.bind(this) }
                />
            </>
        );
    }
}

export default DemoComponentHiddenLightbox;
