import React from 'react';
import Invalid from "../../../../src/components/sources/proper-sources/Invalid";
import { mount, shallow } from "enzyme";
import { FADE_IN_CLASS_NAME } from "../../../../src/constants/classes-names";

const fsLightbox = {
    elements: {
        sources: []
    }
};

fsLightbox.elements.sources[10] = {
    current: {
        classList: {
            add: jest.fn()
        }
    }
};

let invalid;

describe('attaching ref and adding fade in class', () => {
    beforeAll(() => {
        invalid = mount(<Invalid fsLightbox={ fsLightbox } index={ 10 }/>);
    });

    it('should be equal to Invalid', () => {
        expect(fsLightbox.elements.sources[10].current).toEqual(invalid.getDOMNode());
    });

    it('should add fade in class name', () => {
        expect(fsLightbox.elements.sources[10].current.classList.contains(FADE_IN_CLASS_NAME))
            .toBe(true);
    });
});

describe('DOM', () => {
    beforeAll(() => {
        invalid = shallow(<Invalid fsLightbox={ fsLightbox } index={ 10 }/>);
    });

    it('should match snapshot', () => {
        expect(invalid).toMatchSnapshot();
    });
});
