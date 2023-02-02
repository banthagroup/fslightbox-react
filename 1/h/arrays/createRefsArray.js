import React from 'react';

export function createRefsArray({ props: { sources } }) {
    const refsArray = [];

    for (let i = 0; i < sources.length; i++) {
        refsArray.push(React.createRef());
    }

    return refsArray;
}
