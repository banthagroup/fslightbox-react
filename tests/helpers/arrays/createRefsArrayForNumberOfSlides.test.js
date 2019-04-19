import React from 'react';
import { createRefsArrayForGivenNumber } from "../../../src/helpers/arrays/createRefsArrayForGivenNumber";

describe('creating refs array for given number', () => {
    let refsArray;

    beforeAll(() => {
        refsArray = createRefsArrayForGivenNumber(4);
    });

    it('should be equal to array with 4 refs', () => {
        expect(refsArray).toEqual([
            React.createRef(),
            React.createRef(),
            React.createRef(),
            React.createRef()
        ]);
    });
});