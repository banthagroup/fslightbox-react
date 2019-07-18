import React from 'react';
import { shallow } from "enzyme/build";
import Loader from "./Loader";

test('Loader DOM', () => {
    expect(shallow(<Loader/>)).toMatchSnapshot();
});
