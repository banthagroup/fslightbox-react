import React from 'react';
import Image from "../../../../src/components/sources/proper-sources/Image";
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

describe('ref to sources array in fsLightbox object', () => {
    beforeAll(() => {
        image = mount(<Image
            fsLightbox={ fsLightbox }
            index={ 0 }
        />);
    });

    it('should be equal to image', () => {
        expect(fsLightbox.elements.sources[0].current).toEqual(image.getDOMNode());
    });
});

describe('on load', () => {
    beforeAll(() => {
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
    });

    it('should call handleLoad', () => {
        expect(fsLightbox.collections.sourcesLoadsHandlers[2].handleLoad).toBeCalledWith({
            key: 'image-load-event'
        });
    });
});


describe('Image DOM', () => {
    beforeAll(() => {
        image = shallow(<Image fsLightbox={ fsLightbox } index={ 0 }/>);
    });

    it('should match snapshot', () => {
        expect(image).toMatchSnapshot();
    });
});

