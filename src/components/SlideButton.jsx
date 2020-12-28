import React from 'react';
import Svg from "./helpers/Svg.jsx";
import { FLEX_CENTERED_CLASS_NAME, PREFIX } from "../constants/classes-names";

const SlideButton = ({ onClick, name, d }) => {
    const titleName = name.charAt(0).toUpperCase() + name.slice(1);
    const slideBtnClassName = `${PREFIX}slide-btn`;

    return (
        <div onClick={onClick}
             title={`${titleName} slide`}
             className={`${slideBtnClassName}-container ${slideBtnClassName}-${name}-container`}>
            <div className={`${slideBtnClassName} ${FLEX_CENTERED_CLASS_NAME}`}>
                <Svg
                    viewBox="0 0 20 20"
                    size="20px"
                    d={d}
                />
            </div>
        </div>
    );
};

export default SlideButton;
