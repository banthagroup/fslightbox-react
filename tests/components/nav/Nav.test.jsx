import React from 'react';
import { shallow } from 'enzyme/build';
import Nav from "../../../src/components/nav/Nav";

const fsLightbox = {
    data: {
        sourcesCount: 2
    }
};
let nav;

describe('data.sourcesCount > 2 - rendering SlideNumber and testing DOM', () => {
    beforeAll(() => {
        fsLightbox.data.sourcesCount = 2;
        nav = shallow(<Nav fsLightbox={ fsLightbox }/>);
    });

    it('should match snapshot', () => {
        expect(nav).toMatchSnapshot();
    });
});

describe('data.sourcesCount === 1 - not rendering SlideNumber', () => {
    beforeAll(() => {
        fsLightbox.data.sourcesCount = 1;
        nav = shallow(<Nav fsLightbox={ fsLightbox }/>);
    });

    it('should not have SlideNumber child', () => {
        expect(nav.find('SlideNumber')).toHaveLength(0);
    });
});
