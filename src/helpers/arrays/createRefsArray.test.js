import React from 'react';
import { createRefsArray } from "./createRefsArray";

test('returning array filled with refs', () => {
    expect(createRefsArray({ props: { sources: { length: 4 } } })).toEqual([
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef()
    ]);
});
