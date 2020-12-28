import React, { Component } from 'react';
import '../src/scss/index.scss';
import "./css/demo.css";
import FsLightbox from '../src/FsLightbox.jsx';
import { testSources } from "../tests/__tests-services__/testVars";

class DemoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lightboxController: {
                toggler: false,
                slide: 1
            },
            key: 0
        };

        this.openLightboxOnSlide = this.openLightboxOnSlide.bind(this);
        this.remountLightbox = this.remountLightbox.bind(this);
    }

    openLightboxOnSlide(number) {
        this.setState({
            lightboxController: {
                toggler: !this.state.lightboxController.toggler,
                slide: number
            }
        });
    }

    remountLightbox() {
        this.setState({
            key: this.state.key + 1
        });
    }

    render() {
        return (
            <>
                <button onClick={() => this.openLightboxOnSlide(1)}>
                    Open Lightbox on slide 1
                </button>
                <button onClick={() => this.openLightboxOnSlide(2)}>
                    Open Lightbox on slide 2
                </button>
                <button onClick={this.remountLightbox}>
                    Remount lightbox
                </button>

                <FsLightbox
                    toggler={this.state.lightboxController.toggler}
                    sources={testSources}
                    customAttributes={[
                        {
                            srcSet: '/demo/img/7.jpg 600w, /demo/img/5.jpg 1200w',
                            sizes: '(max-width: 600px) 600px, 1200px'
                        }
                    ]}
                    slide={this.state.lightboxController.slide}
                    disableLocalStorage={true}
                    loadOnlyCurrentSource={true}
                    key={this.state.key}
                />
            </>
        );
    }
}

export default DemoComponent;
