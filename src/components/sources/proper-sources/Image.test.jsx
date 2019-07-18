import React from 'react';
import Image from "./Image";
import { mount, shallow } from "enzyme";

let fsLightbox = {
    data: {
        sources: []
    },
    elements: {
        sources: [{
            current: null
        }]
    },
    collections: {
        sourcesLoadsHandlers: [
            {
                handleLoad: () => {}
            }
        ]
    }
};

let image;

test('ref to sources array in fsLightbox object', () => {
    image = mount(<Image
        fsLightbox={ fsLightbox }
        index={ 0 }
    />);
    expect(fsLightbox.elements.sources[0].current).toEqual(image.getDOMNode());
});

test('on load', () => {
    fsLightbox.collections.sourcesLoadsHandlers[2] = {
        handleLoad: jest.fn()
    };
    image = shallow(<Image
        fsLightbox={ fsLightbox }
        index={ 2 }
    />);
    image.simulate('load', {
        key: 'image-load-event'
    });

    expect(fsLightbox.collections.sourcesLoadsHandlers[2].handleLoad).toBeCalledWith({
        key: 'image-load-event'
    });
});


test('Image DOM', () => {
    image = shallow(<Image fsLightbox={ fsLightbox } index={ 0 }/>);

    expect(image).toMatchSnapshot();
});

