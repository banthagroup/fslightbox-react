import React from 'react';

export const createRefsArrayForNumberOfUrls = (urls) => {
    const refsArray = [];
    for (let i = 0; i < urls.length; i++) {
        refsArray.push(React.createRef());
    }
    return refsArray;
};