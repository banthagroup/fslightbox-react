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
                <div id="output" />
                <button onClick={this.toggleLightbox}>Toggle lightbox</button>
                <button onClick={this.toggleLightboxSecond}>Toggle Lightbox</button>
                <FsLightbox
                    toggler={this.state.toggler}
                    loadOnlyCurrentSource={true}
                    sources={[
                        'demo/images/4.jpeg',
                        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                        'demo/images/3.jpeg',
                        'demo/images/4.jpeg',
                        <div className="xd">lul</div>
                    ]}
                    customAttributes={[
                        {
                            alt: 'siema',
                            srcSet: 'demo/images/1.jpeg 1x, demo/images/2.jpg 2x, demo/images/3.jpeg 3x'
                        }
                    ]}
                    openOnMount={false}
                    onOpen={() => console.log('open')}
                    onShow={() => console.log('show')}
                    onClose={() => console.log('close')}
                    onInit={() => console.log('init')}
                />
                <FsLightbox toggler={this.state.toggler2} sources={["../demo/images/5.jpg"]} />
            </>
        );
    }
}

export default DemoComponent;
