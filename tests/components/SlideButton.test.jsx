import React from 'react';
import { shallow } from "enzyme";
import SlideButton from "../../src/components/SlideButton";

const onClick = () => {};

let slideButton = shallow(<SlideButton
    onClick={ onClick }
    name='next'
    d='M1.729'
/>);

it('should add uppercased title depending on title prop', () => {
    expect(slideButton.prop('title')).toBe('Next slide');
});

it('should add onClick to wrapper from props', () => {
    expect(slideButton.prop('onClick')).toBe(onClick);
});

it('should add proper className depending on name prop', () => {
    expect(slideButton.prop('className')).toBe(
        'fslightbox-slide-btn-container fslightbox-slide-btn-next-container'
    );
});

it('should pass d prop to Svg component', () => {
    expect(slideButton.find('Svg').prop('d')).toBe('M1.729');
});
