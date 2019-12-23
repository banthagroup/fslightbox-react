import React, { Component } from 'react';
import '../src/scss/index.scss';
import "./css/demo.css";
import FsLightbox from '../src/FsLightbox.jsx';
import { testSources } from "../tests/__tests-services__/testVars";

class DemoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggler: true,
            toggler2: false,
            updated: true,
            slide: 1,
            source: '',
            sourceIndex: 0,
            lightboxKey: 'xd'
        };

        setTimeout(() => {
            this.setState({
                lightboxKey: 'jd'
            });
        }, 1000);

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
                <button onClick={ this.toggleLightbox }>Toggle Lightbox</button>
                <button onClick={ this.toggleLightboxSecond }>Toggle Lightbox</button>
                <div className="images">
                    <img className="image" src="../demo/images/1.jpeg" alt=""/>
                    <img className="image" src="../demo/images/2.jpg" alt=""/>
                    <img className="image" src="../demo/images/3.jpeg" alt=""/>
                </div>
                <FsLightbox
                    toggler={ this.state.toggler }
                    sources={ testSources }
                    openOnMount={ true }
                    customSources={ [null, null, null, null, <div className="xd">lul</div>] }
                    onOpen={ () => console.log('open') }
                    onShow={ () => console.log('show') }
                    onClose={ () => console.log('close') }
                    onInit={ () => console.log('init') }
                    key={ this.state.lightboxKey }
                />
                <FsLightbox toggler={ this.state.toggler2 } sources={ ["../demo/images/5.jpg"] }/>
            </>
        );
    }
}

export default DemoComponent;
