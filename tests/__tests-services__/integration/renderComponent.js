import React from 'react';
import ReactDOM from 'react-dom';

const app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);

innerWidth = 1000;
innerHeight = 500;

export default function renderComponent(Component) {
    return ReactDOM.render(<Component />, app);
};