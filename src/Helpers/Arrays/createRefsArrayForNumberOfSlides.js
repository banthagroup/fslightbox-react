import React from 'react';

export const createRefsArrayForNumberOfSlides = (totalSlides) => {
    const refsArray = [];
    for (let i = 0; i < totalSlides; i++) {
        refsArray.push(React.createRef());
    }
    return refsArray;
};