import React, { Component } from 'react';
import '../src/scss/index.scss';
import "./css/demo.css";
import FsLightbox from '../src/FsLightbox.jsx';
import { testSources } from "../tests/__tests-services__/testVars";

class DemoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggler: false,
            updated: true,
            slide: 1,
            source: '',
            sourceIndex: 0,
            sources: null,
            key: 0
        };

        this.toggleLightbox = this.toggleLightbox.bind(this);
    }

    toggleLightbox() {
        this.setState({
            toggler: !this.state.toggler
        });
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                sources: testSources,
                toggler: true
            })
        }, 1000);
    }

    render() {
        return (
            <>
                <button onClick={this.toggleLightbox}>Toggle lightbox</button>
                <div id="output" />
                <FsLightbox
                    toggler={this.state.toggler}
                    sources={this.state.sources}
                    customAttributes={[
                        {
                            alt: 'siema'
                        }
                    ]}
                    onOpen={() => console.log('open')}
                    onShow={() => console.log('show')}
                    onClose={() => console.log('close')}
                    onInit={() => console.log('init')}
                    key={this.state.key}
                />
            </>
        );
    }
}

export default DemoComponent;
