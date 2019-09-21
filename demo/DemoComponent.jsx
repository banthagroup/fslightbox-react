import React, { Component } from 'react';
import '../src/scss/FsLightbox.scss';
import "./css/demo.css";
import FsLightbox from '../src/FsLightbox.jsx';
import { TEST_IMAGE_URL } from "./demoData";

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
                    openOnMount={ true }
                    customSources={ [
                        <div>
                            <img src={ TEST_IMAGE_URL }/>
                        </div>
                    ] }
                    customSourcesGlobalMaxDimensions={ { width: 1920, height: 1060 } }
                />
                <FsLightbox toggler={ this.state.toggler2 } sources={ ["../demo/images/5.jpg"] }/>
            </>
        );
    }
}

export default DemoComponent;
