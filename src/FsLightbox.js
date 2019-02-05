import React, { Component } from 'react';
import ReactDOM from "react-dom";
import List from "./List";

class FsLightbox extends Component {
    render() {
        return (
            <div>
                <List/>
            </div>
        );
    }
}

export default FsLightbox;
ReactDOM.render(<FsLightbox/>, document.getElementById('app'));