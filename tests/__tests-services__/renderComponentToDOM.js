import React from 'react';
import ReactDOM from "react-dom";

export function renderComponentToDOM(Component) {
    const app = document.createElement('div');
    document.body.appendChild(app);
    ReactDOM.render(<Component/>, app);
}
