import React from 'react';

export const createNullArrayForNumberOfSlides = (totalSlides) => {
    const nullArray = [];
    for (let i = 0; i < totalSlides; i++) {
        nullArray.push(null);
    }
    return nullArray;
};