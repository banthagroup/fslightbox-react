import React from 'react';
import { shallow } from "enzyme";
import SlideNumber from "./SlideNumber";

const fsLightbox = {
    componentsServices: {
        setSlideNumber: null
    },
    props: {
        sources: { length: 4 }
    },
    stageIndexes: {
        current: 0
    }
};
const slideNumber = shallow(<SlideNumber fsLightbox={fsLightbox} />);

test('SlideNumber', () => {
    const spans = slideNumber.find('span');
    expect(spans.at(0).text()).toBe('1');
    expect(spans.at(2).text()).toBe('4');

    fsLightbox.componentsServices.setSlideNumber(3);
    expect(slideNumber.find('span').at(0).text()).toBe('3');
});

