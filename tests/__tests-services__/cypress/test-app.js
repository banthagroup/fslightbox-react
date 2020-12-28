import React from 'react';
import ReactDOM from "react-dom";
import '../../../src/scss/index.scss'
import ComponentSwitcher from "../components/ComponentSwitcher.jsx";
import BaseOpenedLightbox from "../components/BaseOpenedLightbox.jsx";

const app = <ComponentSwitcher
    testComponents={[
        BaseOpenedLightbox
    ]}
/>;

ReactDOM.render(app, document.getElementById('app'));
