import React from 'react';
import { shallow } from 'enzyme';
import Nav from "../../../../src/Components/Nav/Nav";

const fsLightbox = {};
const nav = shallow(<Nav fsLightbox={ fsLightbox }/>);

describe('Nav DOM', () => {
    it('should match snapshot', () => {
        expect(nav).toMatchSnapshot();
    });
});
