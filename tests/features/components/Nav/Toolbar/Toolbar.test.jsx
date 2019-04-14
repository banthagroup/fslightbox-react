import React from 'react';
import { shallow } from "enzyme";
import Toolbar from "../../../../../src/components/Nav/Toolbar/Toolbar";

const fsLightbox = {};
const toolbar = shallow(<Toolbar fsLightbox={ fsLightbox }/>);

describe('Toolbar DOM', () => {
    it('should match snapshot', () => {
        expect(toolbar).toMatchSnapshot();
    });
});