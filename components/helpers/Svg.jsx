import React from 'react';
import { PREFIX } from "../../constants/classes-names";

const Svg = ({ size, viewBox, d }) => (
    <svg width={ size }
         height={ size }
         viewBox={ viewBox }
         xmlns="http://www.w3.org/2000/svg">
        <path className={ `${ PREFIX }svg-path` } d={ d }/>
    </svg>
);

export default Svg;
