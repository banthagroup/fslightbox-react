import React, { Component } from 'react';
import FsLightbox from "../../src/FsLightbox.jsx";
import { testSources, testTypes } from "./testVars";
import ReactDOM from "react-dom";
import { getPropsOfDOMElement } from "./testHelpers";
import { act } from 'react-dom/test-utils';

export const onInit = jest.fn();
export const onOpen = jest.fn();
export const onClose = jest.fn();
export const onShow = jest.fn();
export const onSlideChange = jest.fn();

const app = document.createElement('div');
document.body.appendChild(app);

class TestLightboxComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { toggler: false };
        this.fsLightbox = React.createRef();
    }

    render() {
        return (
            <>
                <button id="toggle-button" onClick={ () => this.setState({ toggler: !this.state.toggler }) }>
                    Open lightbox
                </button>
                <FsLightbox
                    ref={ this.fsLightbox }
                    openOnMount={ true }
                    toggler={ this.state.toggler }
                    sources={ testSources }
                    customSources={ [null, null, null, null,
                        <h1 className="custom-source" style={ { width: '100px', height: '100px' } }>Custom
                            source</h1>] }
                    types={ testTypes }
                    captions={ [<h1>Caption</h1>] }
                    onOpen={ onOpen }
                    onClose={ onClose }
                    onInit={ onInit }
                    onShow={ onShow }
                    onSlideChange={ onSlideChange }
                />
            </>
        );
    }
}

const testLightboxComponent = ReactDOM.render(<TestLightboxComponent/>, app);
act(() => {
    const load = new Event('load');
    Object.defineProperty(load, 'target', {
        value: { width: 1000, height: 500 }
    });
    getPropsOfDOMElement(document.getElementsByTagName('img')[0]).onLoad(load);
});
export const fsLightbox = testLightboxComponent.fsLightbox.current;
fsLightbox.data.thumbsInnerWidth = 1500;
