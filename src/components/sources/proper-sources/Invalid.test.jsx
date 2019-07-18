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

test('attaching ref and adding fade in class', () => {
    invalid = mount(<Invalid fsLightbox={ fsLightbox } index={ 10 }/>);
    expect(fsLightbox.elements.sources[10].current).toEqual(invalid.getDOMNode());
    expect(fsLightbox.elements.sources[10].current.classList.contains(FADE_IN_CLASS_NAME))
        .toBe(true);
});

test('DOM', () => {
    invalid = shallow(<Invalid fsLightbox={ fsLightbox } index={ 10 }/>);
    expect(invalid).toMatchSnapshot();
});
