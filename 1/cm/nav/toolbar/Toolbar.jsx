import React from 'react';
import Fs from "../../Fs.jsx";
import CloseButton from "./toolbar-buttons/CloseButton.jsx";
import { PREFIX } from "../../../cn/classes-names";

const Toolbar = ({ fsLightbox }) => (
    <div className={ `${ PREFIX }toolbar` }>
        <Fs o={ fsLightbox }/>
        <CloseButton fsLightbox={ fsLightbox }/>
    </div>
);
export default Toolbar;
