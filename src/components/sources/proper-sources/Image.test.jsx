import React from 'react';
import Image from "./Image";
import { shallow } from "enzyme";

let fsLightbox = {
    props: { sources: [] },
    elements: { sources: [React.createRef()] },
    collections: { sourcesLoadsHandlers: [{ handleLoad: jest.fn() }] }
};

const image = shallow(<Image fsLightbox={ fsLightbox } i={ 0 } />);

test('sources ref', () => {
    expect(image.getElement().ref).toBe(fsLightbox.elements.sources[0]);
});

test('on load', () => {
    image.simulate('load', 'e');

    expect(fsLightbox.collections.sourcesLoadsHandlers[0].handleLoad).toBeCalledWith('e');
});
