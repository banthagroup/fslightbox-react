import React, { Component } from 'react';
import FsLightbox from "../../src/FsLightbox";
import { TEST_IMAGE_URL } from "../__tests-services__/testVariables";
import ReactDOM from 'react-dom';

const app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);
jest.useFakeTimers();

class TestComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { toggler: false };
    }

    render() {
        return (
            <>
                <button id="toggle-button" onClick={ () => this.setState({ toggler: !this.state.toggler }) }>
                    Button
                </button>
                <FsLightbox
                    toggler={ this.state.toggler }
                    sources={ [TEST_IMAGE_URL] }
                />
            </>
        );
    }
}

ReactDOM.render(<TestComponent/>, app);
const toggleButton = document.getElementById('toggle-button');

test('only one source', () => {
    // opening
    toggleButton.click();

    // closing
    toggleButton.click();

    // reopening
    jest.runAllTimers();
    toggleButton.click();
});
