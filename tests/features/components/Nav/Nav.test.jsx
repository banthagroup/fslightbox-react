import React from 'react';
import { shallow } from 'enzyme';
import Nav from "../../../../src/components/nav/Nav";

const fsLightbox = {};
const nav = shallow(<Nav fsLightbox={ fsLightbox }/>);

describe('nav DOM', () => {
    it('should match snapshot', () => {
        expect(nav).toMatchSnapshot();
    });
});
