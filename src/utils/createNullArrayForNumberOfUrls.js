import React from 'react';

export const createNullArrayForNumberOfUrls = (urls) => {
    const nullArray = [];
    for (let i = 0; i < urls.length; i++) {
        nullArray.push(null);
    }
    return nullArray;
};