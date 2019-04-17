import React from 'react';
import { shallow } from "enzyme";
import Toolbar from "../../../../../src/components/nav/toolbar/Toolbar";

const fsLightbox = {};
const toolbar = shallow(<Toolbar fsLightbox={ fsLightbox }/>);

describe('toolbar DOM', () => {
    it('should match snapshot', () => {
        expect(toolbar).toMatchSnapshot();
    });
});