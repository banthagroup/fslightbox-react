import React from 'react';
import { PREFIX } from "../../constants/classes-names";

const Loader = () =>
    (
        <div className={ `${ PREFIX }loader` }>
            <div className={`${ PREFIX }loader-child-1`} />
            <div className={`${ PREFIX }loader-child-2`} />
            <div className={`${ PREFIX }loader-child-3`} />
            <div className={`${ PREFIX }loader-child-4`} />
        </div>
    );

export default Loader;
