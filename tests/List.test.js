import React from 'react';
import { shallow } from 'enzyme';
import List from '../src/List';
import Xd from "../src/xd";

it('renders without crashing', () => {
    const wrapperd = shallow(<Xd/>);
    shallow(<List />);
    expect(wrapperd.find(List).length).toEqual(1);
});

describe('asdlkfjal;sdfjasd', () => {
    expect(1).toEqual(1);
});