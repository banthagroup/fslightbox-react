import React from 'react';
import Svg from "../../helpers/Svg.jsx";
import { FLEX_CENTERED_CLASS_NAME, PREFIX } from "../../../constants/classes-names";

const ToolbarButton = ({ onClick, viewBox, size, d, title }) => (
    <div onClick={ onClick }
         className={ `${ PREFIX }toolbar-button ${ FLEX_CENTERED_CLASS_NAME }` }
         title={ title }>
        <Svg viewBox={ viewBox } size={ size } d={ d }/>
    </div>
);

export default ToolbarButton;
