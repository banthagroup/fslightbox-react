import React from 'react';
import { shallow } from "enzyme/build";
import SourceLoader from "../../../src/components/loaders/SourceLoader";

const sourceLoader = shallow(<SourceLoader/>);

describe('SourceLoader DOM', () => {
    it('should match snapshot', () => {
        expect(sourceLoader).toMatchSnapshot();
    });
});