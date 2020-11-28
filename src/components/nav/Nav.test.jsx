import React from 'react';
import { shallow } from 'enzyme';
import Nav from "./Nav";

const fsLightbox = { props: { sources: { length: 2 } } };
let nav;

test('sources count > 2 - rendering SlideNumber and testing DOM', () => {
    fsLightbox.props.sources.length = 2;
    nav = shallow(<Nav fsLightbox={fsLightbox} />);

    expect(nav.find('SlideNumber')).toHaveLength(1);
});

test('sources count === 1 - not rendering SlideNumber', () => {
    fsLightbox.props.sources.length = 1;
    nav = shallow(<Nav fsLightbox={fsLightbox} />);

    expect(nav.find('SlideNumber')).toHaveLength(0);
});
