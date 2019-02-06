import Svg from "../../src/components/Svg";
import { mount } from "enzyme";
import React from 'react';

describe('SVG', () => {
    it('should have props', () => {
        const size = '1em';
        const viewBox = '0 0 20 20';
        const d = "14M.A 4F";
        const svg = mount(
            <Svg size={size} viewBox={viewBox} d={d}/>
        );

        expect(svg.render().hasClass('fslightbox-svg-icon')).toBeTruthy();
        expect(svg.getDOMNode().attributes.getNamedItem('width').value).toEqual(size);
        expect(svg.getDOMNode().attributes.getNamedItem('height').value).toEqual(size);
        expect(svg.getDOMNode().attributes.getNamedItem('viewBox').value).toEqual(viewBox);
        expect(svg.contains(<path d={d}></path>)).toBeTruthy();
    });
});