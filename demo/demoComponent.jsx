import React, { Component } from 'react';
import FsLightbox from "../src";


class DemoComponent extends Component {

    callEvent() {
        console.log(4);
    }

    render() {
        return (
            <div>
                <FsLightbox
                    urls={ [
                        "../demo/images/1.jpeg",
                        "../demo/images/2.jpg",
                        "../demo/images/3.jpeg",
                    ]}
                    slide={1}

                    onOpen={ this.callEvent.bind(this) }
                />
            </div>
        );
    }
}

export default DemoComponent;